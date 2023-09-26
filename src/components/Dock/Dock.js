import React, { useState, useEffect } from 'react';
import MenuList from "@/components/Dock/MenuList";
import Avatar from "@/components/Dock/Avatar";
import RainbowText from "@/components/common/RainbowText";

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

    // let cls = 'bg-blue-100 transition-all opacity-100 duration-2000 ease-in-out opacity-0 w-0 overflow-hidden'
    //
    // if(isDockVisible) {
    //     cls += 'w-[64px] visible'
    // }

    return (
            <div
                // className={cls}
                className={`${isDockVisible ? 'w-[64px] visible bg-blue-100 transition-all opacity-100 duration-[500ms] ease-in-out' : 'transition-all duration-[500ms] ease-in-out opacity-0 w-0 overflow-hidden'}`}
            >
                <div className='absolute'>
                    <Avatar />
                    <hr className='mt-4'/>
                    <MenuList />
                    <footer className='text-center text-[8px] fixed bottom-2 w-[64px]'>
                        <RainbowText text="YueMengRui"/>
                        <div>
                            ©️{new Date().getFullYear()}&nbsp;{" "}
                        </div>
                    </footer>
                </div>
            </div>
    );
};

export default Dock;