import React from "react";

export const Button2 = ({ children, className }) => {

    return (

        <button className={'rounded bg-[#d0a53d] mx-1 py-2 px-4 font-semibold text-[white] hover:bg-[#181c32] tracking-widest ${className}'}
        >
            {children}

        </button>
    )
}
