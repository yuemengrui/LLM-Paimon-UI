"use client"

import {Chat} from "@/components/Chat/Chat";
import Dock from "@/components/Dock/Dock";
import {useState} from "react";

export default function Home() {

    return (
        <div className='h-full flex'>
            <Dock />
            <Chat/>
        </div>
    )
}
