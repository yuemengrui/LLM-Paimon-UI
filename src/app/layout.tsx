import './globals.css'
import type {Metadata} from 'next'
import { Providers } from "./providers";
import {Dock} from "@/components/Dock/Dock";


export const metadata: Metadata = {
    title: 'LLM-Paimon',
    description: 'LLM-Paimon',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
            <html lang="en">
                <body>
                    <Providers>
                        <Dock/>
                        {children}
                    </Providers>
                </body>
            </html>
    )
}
