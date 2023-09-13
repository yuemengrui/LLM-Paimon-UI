"use client"
import {LeftBar} from "@/components/LeftBar/LeftBar";
import {Chat} from "@/components/Chat/Chat";

export default function Home() {
    return (
        <div className='h-full flex bg-gradient-to-br from-pink-50 to-pink-200'>
            <LeftBar/>
            <Chat/>
        </div>
    )
}
