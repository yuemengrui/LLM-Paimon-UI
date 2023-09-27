import {SiOpenai} from "react-icons/si";
import {Flex} from "@chakra-ui/react";
import {useState} from "react";

export default function AppList() {
    const [selectAppId, setSelectAppId] = useState(1)

    const applist = [
        {
            'id': 1,
            'name': 'app-1'
        },
        {
            'id': 2,
            'name': 'app-2'
        },
        {
            'id': 3,
            'name': 'app-3'
        },
        {
            'id': 4,
            'name': 'app-4'
        },
        {
            'id': 5,
            'name': 'app-5'
        },
        {
            'id': 6,
            'name': 'app-6'
        },
        {
            'id': 7,
            'name': 'app-7'
        },
        {
            'id': 8,
            'name': 'app-8'
        },
        {
            'id': 9,
            'name': 'app-9'
        },
        {
            'id': 10,
            'name': 'app-10'
        }
    ]

    return (
        <div className='w-[200px] rounded-l-3xl px-6 py-6'>
            <Flex alignItems={'center'} mt={6} direction={"column"}>
                {applist.map((item) => {
                    return (
                        <button key={item.id} className={`${selectAppId === item.id ? 'shadow-[0_0_2px_2px_rgba(244,114,182,0.2)] bg-pink-100 text-pink-400' : 'bg-blue-50/75 hover:bg-blue-100 hover:text-pink-300'} w-full rounded-lg px-2 py-2 mt-4`}>
                            <Flex alignItems={'center'} textAlign={'center'}>
                                <SiOpenai className='ml-2'/><span className='ml-2'>{item.name}</span>
                            </Flex>
                        </button>
                    )
                })}
            </Flex>
        </div>
    )
}