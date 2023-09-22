import { PiChatCircleDotsBold } from "react-icons/pi";
import { PiDatabaseBold } from "react-icons/pi";
import { PiGearBold } from "react-icons/pi";
export default function AppList() {
    return (
        <div className='flex flex-col gap-4 text-pink-400 text-xs py-8 px-3'>
            <button className='hover:bg-pink-50'>
                <PiChatCircleDotsBold className='w-full h-full'/>对话
            </button>
            <button className='hover:bg-pink-50'>
                <PiDatabaseBold className='w-full h-full' />知识库
            </button>
            <button className='hover:bg-pink-50'>
                <PiGearBold className='w-full h-full'/>设置
            </button>
        </div>
    )
}