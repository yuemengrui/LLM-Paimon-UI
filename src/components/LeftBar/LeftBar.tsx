import React, {useState} from "react";
import Header from "@/components/LeftBar/Header"
import AppList from "@/components/LeftBar/AppList";

export function LeftBar() {
    const [isOpen, setIsOpen] = useState(false);

    const handleMouseEnter = () => {
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        setIsOpen(false);
    };
    return (
        // bg-gradient-to-l from-blue-50 to-blue-200
        <div style={{
            width: isOpen ? '260px' : '40px',
            transition: 'width 0.6s',
            top: '0',
            left: isOpen ? '0' : '-260px'
            }}
             onMouseEnter={handleMouseEnter}
             onMouseLeave={handleMouseLeave}
             className='h-full'>
            {isOpen ? (
                <div>
                    <Header />
                    <AppList />
                </div>
            ) : (
                <button className='py-96 text-blue-600'>
                    展开
                </button>
            )}
        </div>
    )
}

