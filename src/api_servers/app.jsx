import {http} from '@/api_servers/http'


export async function get_app_list() {
    const args = {
        method: "GET",
        headers: {
            "token":"xxx"
        }
    }

    const response = await http(process.env.NEXT_PUBLIC_LLM_CHAT_URL, args)

    console.log('response', response)

    if (response) {
        return response['data']
    }
}
