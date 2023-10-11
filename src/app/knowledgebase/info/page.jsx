'use client'
import {useSearchParams} from 'next/navigation';
import {Flex} from "@chakra-ui/react";
import {SiOpenai} from "react-icons/si";
import {PiBroom, PiChatTeardropDotsThin} from "react-icons/pi";
import MyTooltip from "../../../components/Tooltip/Tooltip";
import {LiaThumbtackSolid} from "react-icons/lia";
import {Toaster} from "react-hot-toast";
import {IoIosClose} from "react-icons/io";
import {useState} from "react";
import DatasetList from "../../../components/KnowledgeBase/DatasetList";
import ImportData from "../../../components/KnowledgeBase/ImportData";

export default function KnowledgeBaseInfo() {
    const searchParams = useSearchParams()
    const app_id = searchParams.get('app_id')

    const tabList = [
        {
            'name': '数据集'
        },
        {
            'name': '导入数据'
        },
        {
            'name': '配置'
        }
    ]

    const [selectTab, setSelectTab] = useState(tabList[0].name)
    // const [contentType, setContentType] = useState('')

    return (
        <>
            <div className='flex flex-1 w-full bg-blue-50/30 border border-gray-200 bg-white rounded-3xl mt-4 mr-4 ml-4 mb-4'>
                <div className='w-[156px] rounded-l-3xl'>
                    <Flex alignItems={'center'} mt={6} ml={4}>
                        <div
                            className='text-3xl border rounded-lg border-gray-100 shadow-[2px_2px_2px_2px_rgba(0,0,0,0.2)]'>
                            <SiOpenai/></div>
                        <div className='ml-4'>{app_id}</div>
                    </Flex>
                    <Flex mt={8} direction={'column'} gap={2} alignItems={'center'}>
                        {tabList.map((item) => (
                            <button
                                key={item.name}
                                className={`${selectTab === item.name ? 'shadow-[0_0_1px_1px_rgba(244,114,182,0.2)] text-pink-400 bg-pink-100' : 'hover:text-pink-300 hover:bg-blue-100'} w-[128px] rounded-md py-1`}
                                onClick={() => {setSelectTab(item.name)}}
                            >
                                {item.name}
                            </button>
                        ))}
                    </Flex>
                </div>
                <div className='w-[1px] h-full bg-gray-200'/>
                {/*<DatasetList/>*/}
                <ImportData/>
            </div>
        </>
    )
}