'use client'
import {Flex} from "@chakra-ui/react";
import {SiOpenai} from "react-icons/si";
import {useState} from "react";
import Markdown from "@/components/common/Markdown"
import Image from "next/image";

export default function Show() {

    const demoList = [
        {
            id: 0,
            name: '图片问答',
            description: '上传一张图片，针对图片中的信息进行问答',
            messages: [
                {
                    id: 1,
                    role: 'user',
                    type: 'image',
                    url: '/invoice.png',
                    width: 541,
                    height: 349
                },
                {
                    id: 2,
                    role: 'user',
                    content: '图片中的发票代码是什么？'
                },
                {
                    id: 3,
                    role: 'assistant',
                    content: '图片中的发票代码是：011001700111'
                },
                {
                    id: 4,
                    role: 'user',
                    content: '图片中的发票号码和开票日期分别是什么？'
                },
                {
                    id: 5,
                    role: 'assistant',
                    content: '根据OCR结果，图片中的发票号码是75257884，开票日期是2018年06月07日。'
                },
                {
                    id: 6,
                    role: 'user',
                    content: '合计金额和税额分别是多少？价税合计是多少？'
                },
                {
                    id: 7,
                    role: 'assistant',
                    content: '根据OCR结果，我们可以计算出以下信息：\n\n合计金额：18198.28元\n税额：2911.72元\n\n价税合计（大写）：贰万壹仟壹佰壹拾圆整\n价税合计（小写）：￥21110.00元'
                }
            ]
        },
        {
            id: 1,
            name: 'tableQA',
            description: '这是tableQA的描述',
            messages: [
                {
                    id: 1,
                    role: 'assistant',
                    content: 'coming soon'
                }
            ]
        },
        {
            id: 2,
            name: 'chatDB',
            description: '这是chatDB的描述',
            messages: [
                {
                    id: 1,
                    role: 'assistant',
                    content: 'coming soon'
                }
            ]
        }
    ]

    const [selectDemo, setSelectDemo] = useState(demoList[0])

    return (
        <div className='flex w-full bg-blue-50/30'>
            <div className='flex flex-1 boder bg-white rounded-3xl mt-4 ml-4 mb-4 mr-4'>
                <div className='w-[200px] rounded-l-3xl px-6 py-3'>
                    <Flex alignItems={'center'} direction={"column"}>
                        {demoList.map((item) => {
                            return (
                                <button
                                    key={item.id}
                                    className={`${selectDemo.id === item.id ? 'shadow-[0_0_2px_2px_rgba(244,114,182,0.2)] bg-pink-100 text-pink-400' : 'bg-blue-50/75 hover:bg-blue-100 hover:text-pink-300'} w-full rounded-lg px-2 py-2 mt-4`}
                                    onClick={() => setSelectDemo(item)}
                                >
                                    <Flex alignItems={'center'} textAlign={'center'}>
                                        <SiOpenai className='ml-2'/><span className='ml-2'>{item.name}</span>
                                    </Flex>
                                </button>
                            )
                        })}
                    </Flex>
                </div>
                <div className='w-[1px] h-full bg-gray-200'/>
                <div className='relative w-full'>
                    <div className='px-6 py-2'>{selectDemo.description}</div>
                    <div className='h-[1px] bg-gray-200'/>
                    <div className='w-full max-w-4xl mx-auto'>
                        <ul style={{maxHeight: 'calc(100vh - 80px)'}} className='overflow-auto'>
                            {selectDemo.messages.map((message) => {
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
                                                        <div
                                                            className='text-center text-3xl shadow-[0_0_1px_1px_rgba(0,0,0,0.2)] bg-white border rounded-lg border-gray-100'>😊
                                                        </div>
                                                    </Flex>
                                                </div>
                                                {message.type === 'image' ? (<Image src={message.url} alt='image' width={message.width} height={message.height} />) : (
                                                    <div
                                                        className='bg-blue-100 rounded-lg shadow-[0_2px_2px_2px_rgba(96,165,250,0.3)] text-sm mt-3 text-right px-2 py-2 max-w-fit ml-auto'>
                                                        <Markdown>{message.content}</Markdown>
                                                    </div>)}
                                            </div>
                                        )}
                                        {message.role === 'assistant' && (
                                            <div>
                                                <Flex gap={3} w={'100%'} alignItems={'center'} justifyContent={'flex-start'}>
                                                    <div
                                                        className='text-center text-3xl bg-white border rounded-lg border-gray-100 shadow-[0_0_1px_1px_rgba(0,0,0,0.2)]'>
                                                        <SiOpenai/>
                                                    </div>
                                                </Flex>
                                                <div
                                                    className='bg-pink-100 rounded-lg shadow-[0_2px_2px_2px_rgba(244,114,182,0.3)] text-sm mt-3 px-2 py-2'>
                                                    <Markdown>{message.content}</Markdown>
                                                </div>
                                            </div>
                                        )}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
