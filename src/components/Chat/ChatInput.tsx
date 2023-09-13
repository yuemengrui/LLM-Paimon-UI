import Button from "@/components/common/Button"
import {MdRefresh} from "react-icons/md"
import {PiLightningFill} from "react-icons/pi"
import {FiSend} from "react-icons/fi"
import TextareaAutoSize from "react-textarea-autosize"
import RainbowText from "@/components/common/RainbowText";
import {useRef, useState} from "react"
import {v4 as uuidv4} from "uuid"
import {Message} from '@/types/chat'
import {useAppContext} from "@/components/AppContext"
import { ActionType } from "@/reducers/AppReducer"
import {get_llm_answer} from "@/api_servers/api";

export default function ChatInput() {
    const [messageText, setMessageText] = useState("")

    const {
        state: {messageList, currentModel},
        dispatch
    } = useAppContext()

    async function send() {
        const message: Message = {
            id: uuidv4(),
            role: "user",
            content: messageText
        }
        setMessageText("")
        dispatch({ type: ActionType.ADD_MESSAGE, message })

        const llm_answer = await get_llm_answer(messageText)

        const responseMessage: Message = {
            id: uuidv4(),
            role: "assistant",
            content: llm_answer
        }
        dispatch({ type: ActionType.ADD_MESSAGE, message: responseMessage })

    }

    function handleEnter(e: KeyboardEvent) {
        if (e.metaKey && e.code == 'Enter') {
            setMessageText(messageText + '\n')
        } else {
            if (e.code == 'Enter') {
                if (messageText) {
                    send()
                }
            }
        }
    }

    return (
        <div
            className='absolute bottom-0 inset-x-0  pt-10 dark:from-[rgba(53,55,64,0)] dark:to-[#353740] dark:to-[58.85%]'>
            <div className='w-full max-w-4xl mx-auto flex flex-col items-center px-4 space-y-4'>
                {/*<Button*/}
                {/*    icon={MdRefresh}*/}
                {/*    variant='primary'*/}
                {/*    className='font-medium'*/}
                {/*>*/}
                {/*    重新生成*/}
                {/*</Button>*/}
                <div
                    className='flex items-end w-full border border-black/10 dark:border-gray-800/50 bg-blue-200 dark:bg-gray-700 rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.1)] py-2'>
                    <div className='mx-3 mb-2.5'>
                        <PiLightningFill/>
                    </div>
                    <TextareaAutoSize
                        className='outline-none flex-1 max-h-64 mb-1.5 bg-transparent text-black dark:text-white resize-none border-0'
                        placeholder='输入一条消息...'
                        rows={1}
                        value={messageText}
                        // onKeyUp={handleEnter}
                        onKeyDown={handleEnter}
                        onChange={(e) => {
                            if (!(e.target.value === '\n')) {
                                setMessageText(e.target.value)
                            }
                        }}
                    />
                    <Button
                        className='mx-3 !rounded-lg text-blue-500'
                        icon={FiSend}
                        disabled={messageText.trim() === ""}
                        variant='primary'
                        onClick={send}
                    />
                </div>
                <footer className='flex-1 text-center text-sm text-gray-700 dark:text-gray-300 px-4 pb-6'>
                    ©️{new Date().getFullYear()}&nbsp;{" "}
                    <RainbowText text="YueMengRui"/>
                </footer>
            </div>
        </div>
    )
}
