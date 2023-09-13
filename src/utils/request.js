const request  = async (url, init)=>{

    const res = await fetch(prefix+url, {...init})
    if(res.ok) {

    }
    return await res.json()
}

EventStream

let fd = new FormData()

fd.append('filie', File)
request('/foo',{method:'post',body:fd})