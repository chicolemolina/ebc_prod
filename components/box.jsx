
import React from "react";

export const FlexBox = ({ children, className }) => {

    return (

        <div className={'w-full shadow-sm bg-white rounded-md py-7 px-7 tracking-widest ${className}'}
        >
            {children}

        </div>
    )
}




