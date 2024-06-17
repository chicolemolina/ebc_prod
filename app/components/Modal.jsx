import React from "react";

export const Modal = ({ children }) => {


    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-8 w-3/12">
                {children}
            </div>
        </div>
    );
}

