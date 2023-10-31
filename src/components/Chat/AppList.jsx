import {SiOpenai} from "react-icons/si";
import {Flex} from "@chakra-ui/react";

export default function AppList({ appList, selectApp, setSelectApp, setCurrentModel }) {

    function appClick(data) {
        setSelectApp(data)
        setCurrentModel(data.llm_name)
    }

    return (
        <div className='w-[200px] rounded-l-3xl px-6 py-6'>
            <Flex alignItems={'center'} mt={6} direction={"column"}>
                {appList.map((item) => {
                    return (
                        <button
                            key={item.id}
                            className={`${selectApp.id === item.id ? 'shadow-[0_0_2px_2px_rgba(244,114,182,0.2)] bg-pink-100 text-pink-400' : 'bg-blue-50/75 hover:bg-blue-100 hover:text-pink-300'} w-full rounded-lg px-2 py-2 mt-4`}
                            onClick={() => appClick(item)}
                        >
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