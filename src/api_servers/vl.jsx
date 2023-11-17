import {http} from 'src/api_servers/http'


export async function vl_image(data) {
    const args = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem('Authorization')
        },
        body: JSON.stringify(data)
    }

    const response = await http(process.env.NEXT_PUBLIC_PREFIX + process.env.NEXT_PUBLIC_VL_IMAGE, args)

    console.log('response', response)
    return response

}


