import { PiChatCircleDotsBold } from "react-icons/pi";
import { PiDatabaseBold } from "react-icons/pi";
import { PiGearBold } from "react-icons/pi";
import {Flex} from "@chakra-ui/react";
import {useState} from "react";
export default function MenuList() {
    const [selectMenuId, setSelectMenuId] = useState(0)
    const MenuList = [
        {
            'id': 0,
            'icon': <PiChatCircleDotsBold className='text-2xl' />,
            'name': '对话'
        },
        {
            'id': 1,
            'icon': <PiGearBold className='text-2xl' />,
            'name': '设置'
        },
        {
            'id': 2,
            'icon': <PiDatabaseBold className='text-2xl' />,
            'name': '知识库'
        }
    ]
    return (
        <Flex className='flex flex-col gap-4 text-blue-400 text-xs py-8 px-2'>
            {MenuList.map((item) => {
                return (
                    <button key={item.id} className={`${selectMenuId === item.id ? 'shadow-[0_0_3px_3px_rgba(244,114,182,0.2)] bg-pink-50 text-pink-400' : 'hover:bg-blue-50 hover:text-pink-300'} px-2 py-1 rounded-lg`}>
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
