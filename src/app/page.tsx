"use client"


import {useEffect, useState} from "react";
import {redirect, useRouter} from 'next/navigation';

export default function Home() {
    const router = useRouter()

    useEffect(() => {
        // router.prefetch('/auth')
        if (!localStorage.getItem('Authorization')) {
            router.push('/auth')
        }
    }, []);

    const [selectMenuId, setSelectMenuId] = useState(0)

    redirect('/chat')

}
