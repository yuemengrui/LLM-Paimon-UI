import MyButton from "@/components/common/MyButton"
import {PiLightningFill} from "react-icons/pi"
import {FiSend} from "react-icons/fi"
import TextareaAutoSize from "react-textarea-autosize"
import {useState} from "react"
import {v4 as uuidv4} from "uuid"
import {Message} from '@/types/chat'
import {get_llm_answer} from "@/api_servers/api";

// @ts-ignore
export default function ChatInput({addMessage}) {
    const [messageText, setMessageText] = useState("")

    async function send() {
        const message: Message = {
            id: uuidv4(),
            role: "user",
            content: messageText
        }
        setMessageText("")
        addMessage(message)

        const llm_answer = await get_llm_answer(messageText)

        const responseMessage: Message = {
            id: uuidv4(),
            role: "assistant",
            content: llm_answer['answer'],
            usage: llm_answer['usage'],
            response: llm_answer
        }
        addMessage(responseMessage)

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
        <div className='absolute bottom-6 inset-x-0'>
            <div className='w-full max-w-4xl mx-auto flex flex-col items-center px-4 space-y-4'>
                <div
                    className='flex items-end w-full border border-back/10 bg-blue-100 rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.1)] py-2'>
                    <div className='mx-3 mb-2.5'>
                        <PiLightningFill/>
                    </div>
                    <TextareaAutoSize
                        className='outline-none flex-1 max-h-64 mb-1.5 bg-transparent text-black resize-none border-0'
                        placeholder='输入一条消息...'
                        rows={1}
                        value={messageText}
                        onKeyDown={handleEnter}
                        onChange={(e) => {
                            if (!(e.target.value === '\n')) {
                                setMessageText(e.target.value)
                            }
                        }}
                    />
                    <MyButton
                        className='mx-3 !rounded-lg text-blue-500'
                        icon={FiSend}
                        disabled={messageText.trim() === ""}
                        variant='primary'
                        onClick={send}
                    />
                </div>
            </div>
        </div>
    )
}
