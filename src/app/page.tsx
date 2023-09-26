"use client"

import {Chat} from "@/components/Chat/Chat";
import Dock from "@/components/Dock/Dock";

export default function Home() {

    return (
        <div className='flex w-full h-full'>
            <Dock />
            <Chat/>
        </div>
    )
}
