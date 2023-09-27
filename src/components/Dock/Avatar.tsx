import Image from "next/image";
export default function Avatar() {
    return (
        <Image src="/paimon.jpg" alt="paimon" width="48" height="48" className='py-2 ml-2'/>
    )
}