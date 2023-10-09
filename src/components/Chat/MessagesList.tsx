import Markdown from "@/components/common/Markdown"
import {SiOpenai} from "react-icons/si"
import {useEffect, useRef, useState} from "react";
import Tag from "@/components/Tag/Tag"
import {Flex, Button} from "@chakra-ui/react"
import MyTooltip from "@/components/Tooltip/Tooltip";
import {GoCopy} from "react-icons/go";
import {RiDeleteBinLine} from "react-icons/ri";
import {BsArrowRepeat} from "react-icons/bs";
import {LuPenLine} from "react-icons/lu";
import {CiStar} from "react-icons/ci";
import ChatButton from "@/components/ChatButton/ChatButton";
import {Message} from '@/types/chat'
import {chat} from "@/api_servers/chat";
import {v4 as uuidv4} from "uuid";
import toast, {Toaster} from 'react-hot-toast';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import JsonView from 'react18-json-view'
import 'react18-json-view/src/style.css'

// @ts-ignore
export default function MessageList({messageList, addMessage, delMessage}) {
    const [showFullResponseModal, setShowFullResponseModal] = useState(false)
    const [fullResponse, setFullResponse] = useState({})
    const [showAnswerLabelModal, setShowAnswerLabelModal] = useState(false)
    const listRef = useRef(null)

    useEffect(() => {
        // 每当数据更新时，滚动到最新的数据
        if (listRef.current) {
            // @ts-ignore
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }
    }, [messageList])

    async function Regenerate(prompt: any) {
        delMessage()

        const llm_answer = await chat(prompt)

        const responseMessage: Message = {
            id: uuidv4(),
            role: "assistant",
            content: llm_answer['answer'],
            usage: llm_answer['usage'],
            response: llm_answer
        }
        addMessage(responseMessage)
    }

    async function copyTextToClipboard(text: string) {
        if ('clipboard' in navigator) {
            await navigator.clipboard.writeText(text);
        } else {
            document.execCommand('copy', true, text);
        }
        toast.success('复制成功', {
            duration: 1000,
            position: 'top-center'
        })
    }

    function showFullResponse(data: object) {
        setFullResponse(data)
        setShowFullResponseModal(true)
    }

    function showAnswerLabel() {
        setShowAnswerLabelModal(true)
    }

    return (
        <>
            <div className='w-full max-w-4xl mx-auto'>
                <ul ref={listRef} style={{maxHeight: 'calc(100vh - 200px)'}} className='overflow-auto'>
                    {messageList.map((message: any) => {
                        const isAssistant = message.role === "assistant"
                        return (
                            <li
                                key={message.id}
                                className={`${
                                    isAssistant
                                        ? 'justify-start'
                                        : 'justify-end'
                                } w-full max-w-4xl mx-auto flex space-x-6 px-4 py-6`}
                            >
                                {message.role === 'user' && (
                                    <div>
                                        <div>
                                            <Flex gap={3} w={'100%'} alignItems={'center'} justifyContent={'flex-end'}>
                                                <MyTooltip label='复制'>
                                                    <ChatButton onClick={() => copyTextToClipboard(message.content)}>
                                                        <GoCopy/>
                                                        <Toaster/>
                                                    </ChatButton>
                                                </MyTooltip>
                                                <MyTooltip label='重新生成'>
                                                    <ChatButton onClick={() => Regenerate(message.content)}>
                                                        <BsArrowRepeat/>
                                                    </ChatButton>
                                                </MyTooltip>
                                                <MyTooltip label='删除'>
                                                    <ChatButton>
                                                        <RiDeleteBinLine/>
                                                    </ChatButton>
                                                </MyTooltip>
                                                <div
                                                    className='text-3xl shadow-[0_0_1px_1px_rgba(0,0,0,0.2)] bg-white border rounded-lg border-gray-100'>😊
                                                </div>
                                            </Flex>
                                        </div>
                                        <div
                                            className='bg-blue-100 rounded-lg shadow-[0_2px_2px_2px_rgba(96,165,250,0.3)] text-base mt-3 text-right px-2 py-2 max-w-fit ml-auto'>
                                            <Markdown>{message.content}</Markdown>
                                        </div>
                                    </div>
                                )}
                                {message.role == 'assistant' && (
                                    <div>
                                        <div>
                                            <Flex gap={3} w={'100%'} alignItems={'center'} justifyContent={'flex-start'}>
                                                <div
                                                    className='text-3xl bg-white border rounded-lg border-gray-100 shadow-[0_0_1px_1px_rgba(0,0,0,0.2)]'>
                                                    <SiOpenai/></div>
                                                <MyTooltip label='复制'>
                                                    <ChatButton onClick={() => copyTextToClipboard(message.content)}>
                                                        <GoCopy/>
                                                        <Toaster/>
                                                    </ChatButton>
                                                </MyTooltip>
                                                <MyTooltip label='删除'>
                                                    <ChatButton>
                                                        <RiDeleteBinLine/>
                                                    </ChatButton>
                                                </MyTooltip>
                                                <MyTooltip label='标注预期答案'>
                                                    <ChatButton onClick={showAnswerLabel}>
                                                        <LuPenLine/>
                                                    </ChatButton>
                                                </MyTooltip>
                                                <MyTooltip label='给本次回答打个分'>
                                                    <ChatButton>
                                                        <CiStar/>
                                                    </ChatButton>
                                                </MyTooltip>
                                            </Flex>
                                        </div>
                                        <div
                                            className='bg-pink-100 rounded-lg shadow-[0_2px_2px_2px_rgba(244,114,182,0.3)] text-base mt-3 px-2 py-2'>
                                            <Markdown>{message.content}</Markdown>
                                            <Flex alignItems='center' mt='4' flexWrap='wrap' gap='2'>
                                                <MyTooltip label='本次回答所关联的上下文对数'>
                                                    <Tag text={`${message.response.history ? message.response.history.length : 0}对上下文`}/>
                                                </MyTooltip>
                                                <MyTooltip label='本次请求总共使用的token数量'>
                                                    <Tag text={message.usage.total_tokens + ' tokens'}/>
                                                </MyTooltip>
                                                <MyTooltip label='本次请求所用时间'>
                                                    <Tag text={message.time_cost}/>
                                                </MyTooltip>
                                                <MyTooltip label='点击查看完整响应'>
                                                    <Tag text='完整响应' onClick={() => showFullResponse(message.response)}/>
                                                </MyTooltip>
                                            </Flex>
                                        </div>
                                    </div>
                                )}
                            </li>
                        )
                    })}
                </ul>
            </div>
            {showFullResponseModal && (
                <Modal isOpen={true} onClose={() => setShowFullResponseModal(false)}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>完整响应</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <div className='border bg-orange-50 px-2 py-3'>
                                <JsonView src={fullResponse} theme={'atom'} />
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button border='1px' borderColor='gray.200' onClick={() => setShowFullResponseModal(false)}>关闭</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            )}
            {showAnswerLabelModal && (
                <Modal isOpen={true} onClose={() => setShowAnswerLabelModal(false)}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>请输入期望的答案</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <textarea className='h-64 border bg-orange-50 w-full' placeholder={'请输入期望的回答...'}/>
                        </ModalBody>
                        <ModalFooter>
                            <Button border='1px' borderColor='gray.200' onClick={() => setShowAnswerLabelModal(false)}>确认</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            )}
        </>
    )
}
