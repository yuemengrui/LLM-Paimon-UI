import LeftBar from "@/components/LeftBar";
import Chat from "@/components/chat";

export default function Home() {
    return (
        <div className=' h-full flex'>
            <LeftBar/>
            <Chat/>
        </div>
    )
}
