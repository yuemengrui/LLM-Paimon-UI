export interface Chat {
    id: string
    title: string
    updateTime: number
}


export interface Message {
    id: string
    role: "user" | "assistant"
    content?: string
    usage?: object
    response?: object
}

export interface ChatRequestBody {
    prompt: string
    model: string
}