import React from "react";

export const ButtonDefault = ({ children, className, onClick }) => {

    return (

        <button 
            className={'rounded bg-gray-500 mx-1 py-2 px-4 font-semibold text-[white] hover:bg-gray-700 tracking-widest ${className}'}
            onClick={onClick}
        >
            {children}

        </button>
    )
}

