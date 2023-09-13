import Markdown from "@/components/common/Markdown"
import { SiOpenai } from "react-icons/si"
import { useAppContext } from "@/components/AppContext"
import {useEffect, useRef} from "react";

export default function MessageList() {
    const {
        state: { messageList }
    } = useAppContext()

    const listRef = useRef(null);

    useEffect(() => {
        // 每当数据更新时，滚动到最新的数据
        if (listRef.current) {
            // @ts-ignore
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }
    }, [messageList]);

    return (
        <div className='w-full max-w-4xl mx-auto pt-10 dark:text-gray-300'>
            <ul ref={listRef} style={{maxHeight: 'calc(100vh - 200px)'}} className=' overflow-auto'>
                {messageList.map((message) => {
                    const isUser = message.role === "user"
                    return (
                        <li
                            key={message.id}
                            className={`${
                                isUser
                                    ? "bg-pink-300/20 dark:bg-gray-800"
                                    : "bg-blue-300/20 dark:bg-gray-700"
                            }`}
                        >
                            <div className='w-full max-w-4xl mx-auto flex space-x-6 px-4 py-6 text-lg'>
                                <div className='text-3xl leading-[1]'>
                                    {isUser ? "😊" : <SiOpenai />}
                                </div>
                                <div className='flex-1 text-base'>
                                    <Markdown>{message.content}</Markdown>
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
