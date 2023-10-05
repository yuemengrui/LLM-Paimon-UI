'use client'
import ChatInput from "@/components/Chat/ChatInput";
import Welcome from "@/components/Chat/Welcome";
import MessageList from "@/components/Chat/MessagesList";
import {useState} from "react";
import Tag from "@/components/Tag/Tag";
import {Flex} from "@chakra-ui/react";
import ChatSidebar from "@/components/Chat/ChatSidebar";
import AppList from "@/components/Chat/AppList";

export default function Chat() {
    const [messageList, setMessageList] = useState([])

    const addMessage = (msg) => {
        setMessageList((prevList) => [...prevList, msg])
    }

    const delMessage = (index=-1) => {
        setMessageList(prevList => [...prevList.slice(0, index)])
    }

    const [selectAppId, setSelectAppId] = useState(1)

    const appList = [
        {
            'id': 1,
            'name': 'app-1'
        },
        {
            'id': 2,
            'name': 'app-2'
        },
        {
            'id': 3,
            'name': 'app-3'
        },
        {
            'id': 4,
            'name': 'app-4'
        },
        {
            'id': 5,
            'name': 'app-5'
        },
        {
            'id': 6,
            'name': 'app-6'
        },
        {
            'id': 7,
            'name': 'app-7'
        },
        {
            'id': 8,
            'name': 'app-8'
        },
        {
            'id': 9,
            'name': 'app-9'
        },
        {
            'id': 10,
            'name': 'app-10'
        }
    ]

    const [selectChatId, setSelectChatId] = useState(1)
    const chatList = [
        {
            'id': 1,
            'title': '1-xxxxxxxx'
        },
        {
            'id': 2,
            'title': '2-xxxxxxxx'
        },
        {
            'id': 3,
            'title': '3-xxxxxxxx'
        },
        {
            'id': 4,
            'title': '4-xxxxxxxx'
        },
        {
            'id': 5,
            'title': '5-xxxxxxxx'
        },
        {
            'id': 6,
            'title': '6-xxxxxxxx'
        },
        {
            'id': 7,
            'title': '7-xxxxxxxx'
        },
        {
            'id': 8,
            'title': '8-xxxxxxxx'
        },
        {
            'id': 9,
            'title': '9-xxxxxxxx'
        },
        {
            'id': 10,
            'title': '10-xxxxxxxx'
        }
    ]


    return (
        <>
            <div className='flex w-full bg-blue-50/30'>
                <AppList appList={appList} selectAppId={selectAppId} setSelectAppId={setSelectAppId}/>
                <div className='w-[1px] h-full bg-gray-200'/>
                <div className='flex flex-1 border border-gray-200 bg-white rounded-3xl mt-4 mr-4 ml-4 mb-4'>
                    <ChatSidebar appName={appList.filter((item) => item.id === selectAppId)[0].name} chatList={chatList} selectChatId={selectChatId} setSelectChatId={setSelectChatId} />
                    <div className='w-[1px] h-full bg-gray-200'/>
                    <div className='w-full relative'>
                        <div className='h-[64px] px-6 py-5'>
                            <Flex gap={3}>
                                <div>{chatList.filter((item) => item.id === selectChatId)[0].title}</div>
                                <Tag text='6条记录'/>
                                <Tag text='Baichuan2-13B-8k'/>
                            </Flex>
                        </div>
                        <div className='h-[1px] w-full bg-gray-200'/>
                        {messageList.length ? (<MessageList messageList={messageList} addMessage={addMessage} delMessage={delMessage}/>) : (<Welcome/>)}
                        <ChatInput addMessage={addMessage}/>
                    </div>
                </div>
            </div>
        </>
    )
}
