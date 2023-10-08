import {SiOpenai} from "react-icons/si";
import {Flex} from "@chakra-ui/react";
import {PiBroom} from "react-icons/pi";
import {PiChatTeardropDotsThin} from "react-icons/pi";


export default function ChatSidebar({ selectAppId, appName, chatList, selectChatId, setSelectChatId, newChat }) {


    return (
        <div className='w-[320px] rounded-l-3xl px-6 py-6'>
            <Flex alignItems={'center'}>
                <div
                    className='text-3xl border rounded-lg border-gray-100 shadow-[2px_2px_2px_2px_rgba(0,0,0,0.2)]'>
                    <SiOpenai/></div>
                <div className='ml-4'>{appName}</div>
            </Flex>
            <Flex alignItems={'center'} mt={12}>
                <button onClick={newChat}
                    className='w-[156px]  border rounded-lg border-gray-100 shadow-[0_0_2px_2px_rgba(0,0,0,0.1)] px-4 py-1 hover:text-pink-400 hover:bg-pink-100'>
                    <Flex alignItems={'center'} textAlign={'center'}>
                        <PiChatTeardropDotsThin className='ml-6'/><span className='ml-2'>新对话</span>
                    </Flex>
                </button>
                <button
                    className='ml-4 bg-white border rounded-lg border-gray-100 shadow-[0_0_2px_2px_rgba(0,0,0,0.1)] px-2 py-2 hover:text-pink-400 hover:bg-pink-100'>
                    <PiBroom/>
                </button>
            </Flex>
            <Flex alignItems={'center'} mt={6} direction={"column"}>
                {chatList.map((item) => {
                    return (
                        <button
                            key={item.id}
                            className={`${selectChatId === item.id ? 'shadow-[0_0_1px_1px_rgba(244,114,182,0.2)] text-pink-400 bg-pink-100' : 'hover:text-pink-300 hover:bg-blue-100'} w-full rounded-lg px-2 py-2 mt-4`}
                            onClick={() => setSelectChatId(item.id)}
                        >
                            <Flex alignItems={'center'} textAlign={'center'}>
                                <PiChatTeardropDotsThin className='ml-2'/><span className='ml-2'>{item.name}</span>
                            </Flex>
                        </button>
                    )
                })}
            </Flex>
        </div>
    )
}