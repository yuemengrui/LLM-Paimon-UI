import React from 'react';

export const Copy = ({text}) => {
    const textareaRef = useRef(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.value = text;
        }
    }, [text]);

    () => {
        if (textareaRef.current) {
            textareaRef.current.select();
            document.execCommand('copy');
        }
    };

};