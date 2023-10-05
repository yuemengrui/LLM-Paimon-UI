import { PiChatCircleDotsBold } from "react-icons/pi";
import { PiDatabaseBold } from "react-icons/pi";
import { PiSquaresFourBold } from "react-icons/pi";
import {Flex} from "@chakra-ui/react";
import {useRouter, usePathname} from "next/navigation";
export default function MenuList() {
    const router = useRouter()
    const pathname = usePathname()
    const MenuList = [
        {
            'pathname': '/chat',
            'icon': <PiChatCircleDotsBold className='text-2xl' />,
            'name': '对话'
        },
        {
            'pathname': '/appstore',
            'icon': <PiSquaresFourBold className='text-2xl' />,
            'name': '应用'
        },
        {
            'pathname': '/knowledgebase',
            'icon': <PiDatabaseBold className='text-2xl' />,
            'name': '知识库'
        }
    ]
    return (
        <Flex className='flex flex-col gap-4 text-blue-400 text-xs py-8 px-2'>
            {MenuList.map((item) => {
                return (
                    <button
                        key={item.pathname}
                        className={`${pathname === item.pathname ? 'shadow-[0_0_3px_3px_rgba(244,114,182,0.2)] bg-pink-50 text-pink-400' : 'hover:bg-blue-50 hover:text-pink-300'} px-2 py-1 rounded-lg`}
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
