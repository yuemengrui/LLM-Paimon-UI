import { PiChatCircleDotsBold } from "react-icons/pi";
import { PiDatabaseBold } from "react-icons/pi";
import { PiSquaresFourBold } from "react-icons/pi";
import { BiHomeHeart } from "react-icons/bi";
import { BiSlideshow } from "react-icons/bi";
import { MdSportsKabaddi } from "react-icons/md";
import {Flex} from "@chakra-ui/react";
import {useRouter, usePathname} from "next/navigation";
export default function MenuList() {
    const router = useRouter()
    const pathname = usePathname()
    const MenuList = [
        {
            'root_path': 'home',
            'pathname': '/home',
            'icon': <BiHomeHeart className='text-2xl' />,
            'name': '首页'
        },
        {
            'root_path': 'show',
            'pathname': '/show',
            'icon': <BiSlideshow className='text-2xl' />,
            'name': '秀'
        },
        {
            'root_path': 'chat',
            'pathname': '/chat',
            'icon': <PiChatCircleDotsBold className='text-2xl' />,
            'name': '对话'
        },
        {
            'root_path': 'appstore',
            'pathname': '/appstore/list',
            'icon': <PiSquaresFourBold className='text-2xl' />,
            'name': '应用'
        },
        {
            'root_path': 'knowledgebase',
            'pathname': '/knowledgebase/list',
            'icon': <PiDatabaseBold className='text-2xl' />,
            'name': '知识库'
        },
        {
            'root_path': 'arena',
            'pathname': '/arena',
            'icon': <MdSportsKabaddi className='text-2xl' />,
            'name': '竞技场'
        }
    ]
    return (
        <Flex className='flex flex-col gap-4 text-blue-400 text-xs py-8 px-2'>
            {MenuList.map((item) => {
                return (
                    <button
                        key={item.pathname}
                        className={`${pathname.includes(item.root_path) ? 'shadow-[0_0_3px_3px_rgba(244,114,182,0.2)] bg-pink-50 text-pink-400' : 'hover:bg-blue-50 hover:text-pink-300'} px-2 py-1 rounded-lg`}
                        onClick={() => router.push(item.pathname)}
                    >
                        <Flex gap={1} direction={'column'} align={'center'} textAlign={'center'}>
                            {item.icon}
                            <div>{item.name}</div>
                        </Flex>
                    </button>
                )
            })}
        </Flex>
    )
}
