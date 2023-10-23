import MyButton from "@/components/common/MyButton"
import {PiLightningFill} from "react-icons/pi"
import {FiSend} from "react-icons/fi"
import TextareaAutoSize from "react-textarea-autosize"
import {useState} from "react"
import {v4 as uuidv4} from "uuid"

export default function ChatInput({selectAppId, currentModel, selectChatId, addMessage, updateMessage}) {
    const [messageText, setMessageText] = useState("")

    async function send() {
        const message = {
            id: uuidv4(),
            role: "user",
            content: messageText
        }
        setMessageText("")
        addMessage(message)

        const responseMessage = {
            id: uuidv4(),
            role: "assistant",
            content: "正在思考中...",
            response: {},
        }
        addMessage(responseMessage)


        const response = await fetch(process.env.NEXT_PUBLIC_PREFIX + process.env.NEXT_PUBLIC_LLM_CHAT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("Authorization")
            },
            body: JSON.stringify({
                "app_id": selectAppId,
                "chat_id": selectChatId,
                "uid": message.id,
                "answer_uid": responseMessage.id,
                "prompt": messageText,
                "model_name": currentModel
            })
        })

        const decoder = new TextDecoder("utf-8")

        const reader = response.body.getReader()

        while (true) {
            const { done, value } = await reader.read();
            if (done) {
                break;
            }
            // 解码内容
            try {
                const content  = decoder.decode(value)
                const res = JSON.parse(content)
                updateMessage({
                    id: responseMessage.id,
                    role: responseMessage.role,
                    content: res['answer'],
                    response: res,
                })
            } catch (e) {
                console.log(content, e)
            }

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
