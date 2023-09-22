import Markdown from "@/components/common/Markdown"
import {SiOpenai} from "react-icons/si"
import {useEffect, useRef} from "react";
import Tag from "@/components/Tag/Tag"
import {Flex} from "@chakra-ui/react"
import MyTooltip from "@/components/Tooltip/Tooltip";
import { GoCopy } from "react-icons/go";

// @ts-ignore
export default function MessageList({messageList}) {

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
                {messageList.map((message: any) => {
                    const isAssistant = message.role === "assistant"
                    return (
                        <li
                            key={message.id}
                            className={`${
                                isAssistant
                                    ? "bg-blue-300/20 dark:bg-gray-700"
                                    : "bg-pink-300/20 dark:bg-gray-800"
                            }`}
                        >
                            <div className='w-full max-w-4xl mx-auto flex space-x-6 px-4 py-6'>
                                <div className='text-3xl leading-[1]'>
                                    {isAssistant ? <SiOpenai/> : "😊"}
                                </div>
                                <div className='flex-1'>
                                    <Flex gap={6}>
                                        <div className='bg-blue-400'><GoCopy /></div>
                                        <SiOpenai />
                                    </Flex>
                                    <Markdown className='text-lg mt-3'>{message.content}</Markdown>
                                    {isAssistant ?
                                        (<Flex alignItems='center' mt='12' flexWrap='wrap' gap='6'>
                                            <MyTooltip label='本次回答所关联的上下文对数'>
                                                <Tag text='6对上下文' />
                                            </MyTooltip>
                                            <MyTooltip label='本次请求总共使用的token数量'>
                                                <Tag text={message.usage['total_tokens'] + ' tokens'} />
                                            </MyTooltip>
                                        </Flex>)
                                        : ""}
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
