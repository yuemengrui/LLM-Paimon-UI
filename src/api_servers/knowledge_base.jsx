import {http} from '@/api_servers/http'


export async function get_knowledge_base_list() {
    const args = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem('Authorization')
        }
    }

    const response = await http(process.env.NEXT_PUBLIC_PREFIX + process.env.NEXT_PUBLIC_KB_LIST, args)

    console.log('response', response)

    if (response) {
        return response['list']
    }
    else {
        return []
    }
}


export async function kb_create(name, embedding_model_list) {
    const args = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem('Authorization')
        },
        body: JSON.stringify({
            "name": name,
            "embedding_model_list": embedding_model_list
        })
    }

    const response = await http(process.env.NEXT_PUBLIC_PREFIX + process.env.NEXT_PUBLIC_KB_CREATE, args)

    console.log('response', response)
}



