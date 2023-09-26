import ChatInput from "@/components/Chat/ChatInput";
import Welcome from "@/components/Chat/Welcome";
import MessageList from "@/components/Chat/MessagesList";
import {useState} from "react";
import Tag from "@/components/Tag/Tag";
import {Flex} from "@chakra-ui/react";
import ChatSidebar from "@/components/Chat/ChatSidebar";

export function Chat() {
    const [messageList, setMessageList] = useState([])

    const addMessage = (msg) => {
        setMessageList((prevList) => [...prevList, msg])
    }

    const delMessage = (index=-1) => {
        setMessageList(prevList => [...prevList.slice(0, index)])
    }

    return (
        <>
            <div className='flex w-full bg-blue-100/25'>
                <div className='w-[200px]'>this is app list</div>
                <div className='w-[1px] h-full bg-gray-200'/>
                <div className='flex flex-1 border border-gray-200 bg-white rounded-3xl mt-4 mr-6 ml-6 mb-6'>
                    <ChatSidebar />
                    <div className='w-[1px] h-full bg-gray-200'/>
                    <div className='w-full relative'>
                        <div className='h-[64px] px-6 py-5'>
                            <Flex gap={12}>
                                <div>this is chat</div>
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
