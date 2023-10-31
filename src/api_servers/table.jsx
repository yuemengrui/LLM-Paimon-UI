import {http} from '@/api_servers/http'


export async function table_analysis(data) {
    const args = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem('Authorization')
        },
        body: JSON.stringify(data)
    }

    const response = await http(process.env.NEXT_PUBLIC_PREFIX + process.env.NEXT_PUBLIC_TABLE_ANALYSIS, args)

    console.log('response', response)
    return response

}


