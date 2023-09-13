import ChatInput from "@/components/Chat/ChatInput";
import Welcome from "@/components/Chat/Welcome";
import MessageList from "@/components/Chat/MessagesList";
import {useAppContext} from "@/components/AppContext"

export function Chat() {
    const {
        state: {messageList}
    } = useAppContext()

    return (
        //  bg-gradient-to-r from-pink-50 to-pink-200
        <div className='flex-1 relative'>
            <main className='overflow-y-auto w-full h-full text-gray-900'>
                {messageList.length ? (<MessageList/>) : (<Welcome/>)}
                <ChatInput/>
            </main>
        </div>


    )
}
