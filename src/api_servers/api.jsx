async function http(url, args) {
    console.log('url', url)
    const response = await fetch(url, args)
    return await response.json()
}

export async function get_llm_answer(prompt, model_name = "") {
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
    console.log('env', process.env.NEXT_PUBLIC_LLM_CHAT_URL)
    const response = await http(process.env.NEXT_PUBLIC_LLM_CHAT_URL, args)

    console.log('response', response)

    if (response) {
        return response['data']['answer']
    }
}
