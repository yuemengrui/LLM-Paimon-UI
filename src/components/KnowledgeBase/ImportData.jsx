'use client'
import {
    Card, Flex,
    Grid
} from '@chakra-ui/react'
import toast, {Toaster} from "react-hot-toast";

export default function ImportData() {

    const methodList = [
        {
            icon: 'indexImport',
            title: 'AI智能分段',
            desc: 'AI智能分析数据，自动分段、分句',
        },
        {
            icon: 'qaImport',
            title: 'AI智能QA拆分',
            desc: 'AI智能分析数据，自动生成问答对',
        },
        {
            icon: 'csvImport',
            title: 'JSON 导入',
            desc: '批量导入json问答对，格式{"instruction":"问题", "input":"问题的补充数据", "output":"答案"}',
        }
    ]

    return (
        <div>
            <div className='w-full px-6 mt-6'>
                <Flex direction={'row'} gap={3}>
                    {methodList.map((item) => (
                        <Card
                            key={item.title}
                            py={4}
                            px={5}
                            cursor={'pointer'}
                            h={'100px'}
                            bgColor={'gray.100'}
                        >
                            <div className='text-center text-black'>{item.title}</div>
                            <div className='mt-2 flex-wrap text-sm text-gray-500'>{item.desc}</div>
                        </Card>
                    ))}
                </Flex>
            </div>
        </div>
    )
}