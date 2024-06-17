import React from "react";

const LinkSimple = ({ children, className }) => {

    return (

        <button className={'rounded-full text-[#d0a53d] font-semibold hover:text-[#181c32] tracking-widest py-7 ${className}'}
        >
            {children}

        </button>
    )
}

export default LinkSimple