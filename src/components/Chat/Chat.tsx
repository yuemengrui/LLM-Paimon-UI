import ChatInput from "@/components/Chat/ChatInput";
import Welcome from "@/components/Chat/Welcome";
import MessageList from "@/components/Chat/MessagesList";
import {useState} from "react";

export function Chat() {
    const [messageList, setMessageList] = useState([])

    const addMessage = (msg: any) => {
        // @ts-ignore
        setMessageList((prevList: any[]) => [...prevList, msg])
    }

    return (
        <div className='flex-1 relative'>
            <main className='overflow-y-auto w-full h-full text-gray-900'>
                {messageList.length ? (<MessageList messageList={messageList} />) : (<Welcome/>)}
                <ChatInput addMessage={addMessage}/>
            </main>
        </div>
    )
}
