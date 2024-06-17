'use client'
import React from "react";

const ButtonTab = ({ children, className }) => {

    return (

        <button className={'rounded-md shadow-sm mx-1 py-4 px-6 font-semibold text-[#181c32] transition text-1xl tracking-normal bg-white'}
        >
            {children}

        </button>
    )
}

export default ButtonTab