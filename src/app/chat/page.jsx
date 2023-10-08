'use client'
import ChatInput from "@/components/Chat/ChatInput";
import Welcome from "@/components/Chat/Welcome";
import MessageList from "@/components/Chat/MessagesList";
import {useEffect, useState} from "react";
import Tag from "@/components/Tag/Tag";
import {Flex} from "@chakra-ui/react";
import ChatSidebar from "@/components/Chat/ChatSidebar";
import AppList from "@/components/Chat/AppList";
import {get_app_list, get_app_chat_list, get_app_chat_message_list} from "../../api_servers/app";
import {create_app_chat} from "../../api_servers/app";


export default function Chat() {
    const [messageList, setMessageList] = useState([])
    const [appList, setAppList] = useState([])
    const [selectAppId, setSelectAppId] = useState(null)
    const [chatList, setChatList] = useState([])
    const [selectChatId, setSelectChatId] = useState(null)

    useEffect( () => {
        async function getAppList() {
            const res = await get_app_list()
            console.log('app list res', res)
            if (res.length) {
                setAppList(res)
                setSelectAppId(res[0].id)

                const chat_list_res = await get_app_chat_list(res[0].id)

                console.log('xx', chat_list_res)

                if (chat_list_res.length) {
                    setChatList(chat_list_res)
                    setSelectChatId(chat_list_res[0].id)

                    const message_list = await get_app_chat_message_list(chat_list_res[0].id)

                    console.log('xxx', message_list)

                    if (message_list.length) {
                        setMessageList(message_list)
                    }
                }
            }
        }
        getAppList()
    }, []);

    async function newChat() {
        await create_app_chat(selectAppId)
        const chat_list_res = await get_app_chat_list(selectAppId)

        if (chat_list_res.length) {
            setChatList(chat_list_res)
            setSelectChatId(chat_list_res[0].id)
        }
    }

    const addMessage = (msg) => {
        setMessageList((prevList) => [...prevList, msg])
    }

    const delMessage = (index=-1) => {
        setMessageList(prevList => [...prevList.slice(0, index)])
    }

    const updateMessage = (data) => {
        setMessageList(prevList => [...prevList.slice(0, -1), data])
    }

    return (
            <div className='flex w-full bg-blue-50/30'>
                {appList.length && (
                    <>
                        <AppList appList={appList} selectAppId={selectAppId} setSelectAppId={setSelectAppId} />
                        <div className='w-[1px] h-full bg-gray-200'/>
                        <div className='flex flex-1 border border-gray-200 bg-white rounded-3xl mt-4 mr-4 ml-4 mb-4'>
                            <ChatSidebar selectAppId={selectAppId} appName={appList.filter((item) => item.id === selectAppId)[0].name} chatList={chatList} selectChatId={selectChatId} setSelectChatId={setSelectChatId} newChat={newChat} />
                            <div className='w-[1px] h-full bg-gray-200'/>
                            <div className='w-full relative'>
                                <div className='h-[64px] px-6 py-5'>
                                    <Flex gap={3}>
                                        <div>{chatList.length ? chatList.filter((item) => item.id === selectChatId)[0].name : null}</div>
                                        <Tag text={messageList.length + '条记录'}/>
                                        <Tag text={appList.filter((item) => item.id === selectAppId)[0].llm_name}/>
                                    </Flex>
                                </div>
                                <div className='h-[1px] w-full bg-gray-200'/>
                                {messageList.length ? (<MessageList messageList={messageList} addMessage={addMessage} delMessage={delMessage}/>) : (<Welcome/>)}
                                <ChatInput selectAppId={selectAppId} selectChatId={selectChatId} addMessage={addMessage} updateMessage={updateMessage}/>
                            </div>
                        </div>

                    </>
                )}
            </div>
    )
}
