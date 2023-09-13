import AppContextProvider from "@/components/AppContext"
import './globals.css'
import type {Metadata} from 'next'


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
        <html lang="zh">
        <body>
        <AppContextProvider>{children}</AppContextProvider>
        </body>
        </html>
    )
}
