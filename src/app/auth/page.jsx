"use client"

import {
    Input,
    FormControl,
    FormLabel,
    Flex
} from '@chakra-ui/react'
import {useEffect, useState} from "react";
import { useRouter } from 'next/navigation';
import {auth} from "../../api_servers/auth";

export default function Auth() {
    const router = useRouter();

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isDisabled, setIsDisabled] = useState(true)

    useEffect(() => {
        if (username && password) {
            setIsDisabled(false)
        }
    }, [username, password]);

    async function login() {
        const response = await auth(username, password)
        console.log('response', response)

        if (response && response.token) {
            localStorage.setItem("Authorization", response.token)
            router.push('/home')
        }
    }

    return (
        <>
            <div className='bg-blue-50 flex w-full h-full items-center justify-center'>
                <div className='border px-6 py-6'>
                    <Flex gap={3} align={"center"} direction={"column"}>
                        <FormControl>
                            <FormLabel>账号</FormLabel>
                            <Input value={username} onChange={(e) => {setUsername(e.target.value)}} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>密码</FormLabel>
                            <Input value={password} onChange={(e) => {setPassword(e.target.value)}} />
                        </FormControl>
                        <button
                            disabled={isDisabled}
                            onClick={login}
                            className={`${isDisabled ? 'bg-gray-300' : 'bg-blue-400  hover:shadow-[0_0_1px_1px_rgba(0,0,0,0.2)]'} w-full h-full border py-2 mt-8 rounded-lg`}
                        >
                            登录
                        </button>
                        <div className='mt-2 text-sm'>未注册账号登录时会自动创建新账号</div>
                    </Flex>
                </div>
            </div>
        </>
    )
}
