import React, { useState, useEffect } from 'react';
import AppList from "@/components/Dock/AppList";
import Avatar from "@/components/Dock/Avatar";

const Dock = () => {
    const [isDockVisible, setDockVisible] = useState(false);

    useEffect(() => {
        const handleMouseMove = (event) => {
            if (event.clientX < 64) { // 当鼠标移到页面左边时
                setDockVisible(true);
            } else { // 鼠标离开左边区域时
                setDockVisible(false);
            }
        };

        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
            <div
                className={`${isDockVisible ? 'w-16 visible bg-blue-100 transition-opacity opacity-100 duration-2000 ease-in-out' : 'hidden opacity-0'}`}
            >
                <Avatar />
                <hr className='mt-4'/>
                <AppList />
            </div>
    );
};

export default Dock;