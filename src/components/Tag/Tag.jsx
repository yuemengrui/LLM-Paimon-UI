import React from 'react';

const Tag = ({text}) => {

    return (
        <div className='rounded border border-solid border-red-400 text-red-400 text-center text-xs px-1.5 py-0.5'>
            {text}
        </div>
    );
};

export default Tag;
