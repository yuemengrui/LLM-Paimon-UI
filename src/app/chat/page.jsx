'use client'
import ChatInput from "src/components/Chat/ChatInput";
import Welcome from "src/components/Chat/Welcome";
import MessageList from "src/components/Chat/MessagesList";
import {useEffect, useState} from "react";
import Tag from "src/components/Tag/Tag";
import {Flex} from "@chakra-ui/react";
import ChatSidebar from 'src/components/Chat/ChatSidebar';
import AppList from "src/components/Chat/AppList";
import {get_app_list, get_app_chat_list, get_app_chat_message_list, delete_app_chat} from "src/api_servers/app";
import {create_app_chat} from "src/api_servers/app";
import {useToast} from '@chakra-ui/react'


export default function Chat() {
    const toast = useToast()
    const [messageList, setMessageList] = useState([])
    const [appList, setAppList] = useState([])
    const [selectApp, setSelectApp] = useState({})
    const [chatList, setChatList] = useState([])
    const [selectChatId, setSelectChatId] = useState(null)
    const [currentModel, setCurrentModel] = useState(undefined)
    const [VLHistory, setVLHistory] = useState([])
    const [VLPrompt, setVLPrompt] = useState([])

    async function getAppList() {
        const res = await get_app_list()
        if (res && res.length > 0) {
            setAppList(res)
            setSelectApp(res[0])
            setCurrentModel(res[0].llm_name)
        }
    }

    async function getAppChatList(app_id) {
        if (app_id) {
            const res = await get_app_chat_list(app_id)
            if (res && res.length > 0) {
                setChatList(res)
                setSelectChatId(res[0].id)
            } else {
                setChatList([])
                setSelectChatId(null)
            }
        }
    }

    async function getAppChatMessageList(chat_id) {
        if (chat_id) {
            const message_list = await get_app_chat_message_list(chat_id)
            if (message_list && message_list.length) {
                setMessageList(message_list)

                if (selectApp.name === '图文理解') {
                    const vlprompt = []
                    const reversedList = message_list.toReversed()
                    for (let i = 0; i < reversedList.length; i++) {
                        if (reversedList[i].response.history && reversedList[i].response.history.length > 0) {
                            setVLHistory(reversedList[i].response.history)
                            break
                        } else {
                            if (reversedList[i].role === 'user') {
                                if (reversedList[i].type === 'image') {
                                    vlprompt.push({'image': reversedList[i].url})
                                } else {
                                    vlprompt.push({'text': reversedList[i].content})
                                }
                            }
                        }
                    }
                    setVLPrompt(vlprompt.reverse())
                }
            }
        }
    }


    useEffect(() => {
        getAppList()
    }, []);

    useEffect(() => {
        setSelectChatId(null)
        setChatList([])
        setMessageList([])
        getAppChatList(selectApp.id)
    }, [selectApp]);

    useEffect(() => {
        setMessageList([])
        getAppChatMessageList(selectChatId)
    }, [selectChatId]);

    async function newChat() {
        const resp = await create_app_chat(selectApp.id)
        if (resp) {
            if (resp.errmsg) {
                toast({
                    title: '失败',
                    description: resp.errmsg,
                    status: 'error',
                    position: 'top',
                    duration: 2000,
                })
            } else {
                toast({
                    title: '成功',
                    status: 'success',
                    position: 'top',
                    duration: 2000,
                })
            }
        } else {
            toast({
                title: '失败',
                status: 'error',
                position: 'top',
                duration: 2000,
            })
        }
        if (selectApp.name === '图文理解') {
            setVLHistory([])
            setVLPrompt([])
        }
        getAppChatList(selectApp.id)

    }

    async function deleteChat(chat_id) {
        const resp = await delete_app_chat(chat_id)
        if (resp) {
            if (resp.errmsg) {
                toast({
                    title: '删除失败',
                    description: resp.errmsg,
                    status: 'error',
                    position: 'top',
                    duration: 2000,
                })
            } else {
                toast({
                    title: '删除成功',
                    status: 'success',
                    position: 'top',
                    duration: 2000,
                })
            }

        } else {
            toast({
                title: '删除失败',
                status: 'error',
                position: 'top',
                duration: 2000,
            })
        }
        if (selectApp.name === '图文理解') {
            setVLHistory([])
            setVLPrompt([])
        }
        getAppChatList(selectApp.id)
    }

    const addMessage = (msg) => {
        setMessageList((prevList) => [...prevList, msg])
    }

    const delMessage = (index = -1) => {
        setMessageList(prevList => [...prevList.slice(0, index)])
    }

    const updateMessage = (data) => {
        setMessageList(prevList => [...prevList.slice(0, -1), data])
    }

    return (
        <div className='flex w-full bg-blue-50/30'>
            {appList.length > 0 && (
                <>
                    <AppList appList={appList} selectApp={selectApp} setSelectApp={setSelectApp}
                             setCurrentModel={setCurrentModel}/>
                    <div className='w-[1px] h-full bg-gray-200'/>
                    <div className='flex flex-1 border border-gray-200 bg-white rounded-3xl mt-4 mr-4 ml-4 mb-4'>
                        <ChatSidebar appName={appList.filter((item) => item.id === selectApp.id)[0].name}
                                     chatList={chatList} selectChatId={selectChatId} setSelectChatId={setSelectChatId}
                                     newChat={newChat} deleteChat={deleteChat}/>
                        <div className='w-[1px] h-full bg-gray-200'/>
                        {selectChatId && (
                            <>
                                <div className='w-full relative'>
                                    <div className='h-[64px] px-6 py-5'>
                                        <Flex gap={3}>
                                            <div>{chatList.length ? chatList.filter((item) => item.id === selectChatId)[0].name || '新对话' : '新对话'}</div>
                                            <Tag text={messageList.length + '条记录'}/>
                                            {/*<Tag text={appList.filter((item) => item.id === selectApp.id)[0].llm_name}/>*/}
                                        </Flex>
                                    </div>
                                    <div className='h-[1px] w-full bg-gray-200'/>
                                    {messageList.length ? (
                                        <MessageList selectApp={selectApp} currentModel={currentModel}
                                                     selectChatId={selectChatId} messageList={messageList}
                                                     addMessage={addMessage} delMessage={delMessage}
                                                     updateMessage={updateMessage}/>) : (<Welcome/>)}
                                    <ChatInput selectApp={selectApp} currentModel={currentModel}
                                               selectChatId={selectChatId} addMessage={addMessage}
                                               updateMessage={updateMessage} VLHistory={VLHistory}
                                               setVLHistory={setVLHistory} VLPrompt={VLPrompt}
                                               setVLPrompt={setVLPrompt}/>
                                </div>
                            </>
                        )}
                    </div>

                </>
            )}
        </div>
    )
}
