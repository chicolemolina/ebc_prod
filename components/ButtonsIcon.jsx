import React from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";

export const ButtonIcon = ({ children, className }) => {

    return (

        <>
            <button type="button"  data-tooltip-id="my-tooltip-1" className={'w-2/12 py-2 px-4 text-2xl text-[#181c32] ${className}'}>
                {children}

            </button>
            <ReactTooltip
                id="my-tooltip-1"
                place="top"
                content="Ver Imagen"
            />
        </>
        
    )
}
