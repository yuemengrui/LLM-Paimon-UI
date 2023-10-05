import {http} from '@/api_servers/http'

export async function chat(prompt, model_name = "") {
    const args = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "prompt": prompt,
            "model_name": model_name,
            "stream": "False"
        })
    }

    const response = await http(process.env.NEXT_PUBLIC_Prefix + process.env.NEXT_PUBLIC_LLM_CHAT_URL, args)

    console.log('response', response)

    if (response) {
        return response['data']
    }
}

