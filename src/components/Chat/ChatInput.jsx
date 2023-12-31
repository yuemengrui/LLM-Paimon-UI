import MyButton from "src/components/common/MyButton"
import {PiLightningFill} from "react-icons/pi"
import {FiSend} from "react-icons/fi"
import TextareaAutoSize from "react-textarea-autosize"
import React, {useEffect, useState} from "react"
import {v4 as uuidv4} from "uuid"
import {fetchEventSource} from '@microsoft/fetch-event-source';
import {fileUpload} from "src/api_servers/file";
import {table_analysis} from "src/api_servers/table";
import {useToast} from '@chakra-ui/react'
import {vl_image} from "src/api_servers/vl";

export default function ChatInput({
                                      selectApp,
                                      currentModel,
                                      selectChatId,
                                      addMessage,
                                      updateMessage,
                                      VLHistory,
                                      setVLHistory,
                                      VLPrompt,
                                      setVLPrompt
                                  }) {
    const toast = useToast()
    const [messageText, setMessageText] = useState("")
    const [selectFile, setSelectFile] = useState(null)
    const [tableContent, setTableContent] = useState('')
    const [custom, setCustom] = useState({})

    const changeHandler = (event) => {
        setSelectFile(event.target.files[0])
    };

    async function VLImageHandler(event) {
        if (event.target.files[0]) {
            const formData = new FormData();
            formData.append('file', event.target.files[0]);
            const res = await fileUpload(formData)
            if (res) {
                const req_data = {
                    "app_id": selectApp.id,
                    "chat_id": selectChatId,
                    "uid": uuidv4(),
                    "url": res.file_url
                }
                await vl_image(req_data)
                addMessage({
                    id: req_data.uid,
                    role: 'user',
                    type: 'image',
                    url: res.file_url,
                    height: 600,
                    width: 600
                })
                setVLPrompt((preState) => [...preState, {'image': res.file_url}])
            }
        }
    }


    useEffect(() => {

        async function file_upload(data) {
            const res = await fileUpload(data)

            if (res) {
                const req_data = {
                    "app_id": selectApp.id,
                    "chat_id": selectChatId,
                    "uid": uuidv4(),
                    "file_hash": res.file_hash,
                    "file_url": res.file_url
                }

                addMessage({
                    id: req_data.uid,
                    role: "assistant",
                    type: 'text',
                    content: '图片分析中......',
                    response: {}
                })

                const table_analysis_res = await table_analysis(req_data)
                if (table_analysis_res) {
                    updateMessage({
                        id: req_data.uid,
                        role: 'user',
                        type: 'image',
                        url: table_analysis_res.file_url,
                        height: 600,
                        width: 600
                    })
                    addMessage({
                        id: uuidv4(),
                        role: "assistant",
                        type: 'text',
                        content: '图片分析完成，请提问吧',
                        response: {}
                    })
                    setTableContent(table_analysis_res.table_content)
                    setCustom({
                        'tableQA': {
                            'table_content': table_analysis_res.table_content
                        }
                    })
                }
            }
        }

        if (selectFile) {
            const formData = new FormData();

            formData.append('file', selectFile);

            file_upload(formData)
        }
    }, [selectFile]);

    async function send() {
        if (selectApp.name === 'tableQA') {
            if (tableContent === '') {
                toast({
                    title: '请重新上传表格图片',
                    status: 'error',
                    position: 'top',
                    duration: 2000,
                })
                setMessageText("")
                return
            }
        }

        const message = {
            id: uuidv4(),
            role: "user",
            type: 'text',
            content: messageText,
        }
        const true_prompt = [...VLPrompt, {'text': messageText}]
        setMessageText("")
        addMessage(message)

        const responseMessage = {
            id: uuidv4(),
            role: "assistant",
            type: 'text',
            content: "正在思考中...",
            response: {},
        }
        addMessage(responseMessage)

        if (selectApp.name === '图文理解') {
            await fetchEventSource(process.env.NEXT_PUBLIC_PREFIX + process.env.NEXT_PUBLIC_VL_CHAT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("Authorization")
                },
                body: JSON.stringify({
                    "app_id": selectApp.id,
                    "chat_id": selectChatId,
                    "uid": message.id,
                    "answer_uid": responseMessage.id,
                    "prompt": message.content,
                    "model_name": currentModel,
                    "history": VLHistory,
                    "true_prompt": true_prompt
                }),
                onmessage(msg) {
                    // 解码内容
                    try {
                        const res = JSON.parse(msg.data)
                        updateMessage({
                            id: responseMessage.id,
                            role: responseMessage.role,
                            type: res.type,
                            url: res.url,
                            content: res['answer'],
                            response: res,
                        })
                        setVLPrompt([])
                        setVLHistory(res.history)
                    } catch (e) {
                        console.log(e)
                    }

                },
                onerror(error) {
                    updateMessage({
                        id: responseMessage.id,
                        role: responseMessage.role,
                        type: 'text',
                        content: '抱歉！服务繁忙！请稍后重试！',
                        response: {},
                    })
                    throw error
                }
            })
        } else {
            await fetchEventSource(process.env.NEXT_PUBLIC_PREFIX + process.env.NEXT_PUBLIC_LLM_CHAT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("Authorization")
                },
                body: JSON.stringify({
                    "app_id": selectApp.id,
                    "chat_id": selectChatId,
                    "uid": message.id,
                    "answer_uid": responseMessage.id,
                    "prompt": message.content,
                    "model_name": currentModel,
                    "custom": custom
                }),
                onmessage(msg) {
                    // 解码内容
                    try {
                        const res = JSON.parse(msg.data)
                        updateMessage({
                            id: responseMessage.id,
                            role: responseMessage.role,
                            type: 'text',
                            content: res['answer'],
                            response: res,
                        })
                    } catch (e) {
                        console.log(e)
                    }

                },
                onerror(error) {
                    updateMessage({
                        id: responseMessage.id,
                        role: responseMessage.role,
                        type: 'text',
                        content: '抱歉！服务繁忙！请稍后重试！',
                        response: {},
                    })
                    throw error
                }
            })
        }
    }

    function handleEnter(e) {
        if (e.metaKey && e.code === 'Enter') {
            setMessageText(messageText + '\n')
        } else {
            if (e.code === 'Enter') {
                if (messageText) {
                    send()
                }
            }
        }
    }

    return (
        <div className='absolute bottom-6 inset-x-0'>
            {selectApp.name === 'tableQA' && (
                <div className='text-center mb-4 mt-2'>
                    <label htmlFor="upload-button"
                           className="cursor-pointer text-blue-600 underline decoration-blue-600">上传一张表格图片</label>
                    <input id="upload-button" style={{display: "none"}} accept='.jpg,.png,.jpeg' type="file"
                           onChange={changeHandler}/>
                </div>
            )}
            {selectApp.name === '图文理解' && (
                <div className='text-center mb-4 mt-2'>
                    <label htmlFor="upload-button"
                           className="cursor-pointer text-blue-600 underline decoration-blue-600">上传一张图片</label>
                    <input id="upload-button" style={{display: "none"}} accept='.jpg,.png,.jpeg' type="file"
                           onChange={(e) => VLImageHandler(e)}/>
                </div>
            )}
            <div className='w-full max-w-4xl mx-auto flex flex-col items-center px-4 space-y-4'>
                <div
                    className='flex items-end w-full border border-back/10 bg-blue-100 rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.1)] py-2'>
                    <div className='mx-3 mb-2.5'>
                        <PiLightningFill/>
                    </div>
                    <TextareaAutoSize
                        className='outline-none flex-1 max-h-64 mb-1.5 bg-transparent text-black resize-none border-0'
                        placeholder='输入一条消息...'
                        rows={1}
                        value={messageText}
                        maxLength={32 * 1024}
                        onKeyDown={handleEnter}
                        onChange={(e) => {
                            if (!(e.target.value === '\n')) {
                                setMessageText(e.target.value)
                            }
                        }}
                    />
                    <MyButton
                        className='mx-3 !rounded-lg text-blue-500'
                        icon={FiSend}
                        disabled={messageText.trim() === ""}
                        variant='primary'
                        onClick={send}
                    />
                </div>
            </div>
        </div>
    )
}
