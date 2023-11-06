"use client"


import {useEffect} from "react";
import {useRouter} from 'next/navigation';
import {auth_token_verify} from "src/api_servers/auth";

export default function Paimon() {
    const router = useRouter()

    useEffect(  () => {

        async function auth_token() {
            const res = await auth_token_verify()

            console.log('token_res', res)
            if (res) {
                router.push('/home')
            }
            else {
                router.push('/auth')
            }
        }
        auth_token()
    }, []);

}
