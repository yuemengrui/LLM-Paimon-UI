"use client"


import {useEffect} from "react";
import {useRouter} from 'next/navigation';
import {auth_token_verify} from "@/api_servers/auth";

export default function Home() {
    const router = useRouter()

    useEffect( () => {

        async function auth_token() {
            return await auth_token_verify()
        }

        const res = auth_token()
        if (res) {
            router.push('/chat')
        }
        else {
            router.push('/auth')
        }
    }, []);

}
