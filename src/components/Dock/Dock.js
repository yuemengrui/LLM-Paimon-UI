import React, { useState, useEffect } from 'react';
import AppList from "@/components/LeftBar/AppList";

const Dock = () => {
    const [isDockVisible, setDockVisible] = useState(false);

    useEffect(() => {
        const handleMouseMove = (event) => {
            if (event.clientX < 50) { // 当鼠标移到页面左边时
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
                className={`${isDockVisible ? 'transition-opacity visible bg-blue-500 opacity-100 duration-2000 ease-in-out' : 'hidden opacity-0'}`}
            >
                <AppList />
            </div>
    );
};

export default Dock;