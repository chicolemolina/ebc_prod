import { useState } from "react";
import { RecargaContext }  from "./RecargaContext"


export const RecargaProvider = ({ children }) => {

    const [recarga, setRecarga] = useState(0);

    return (
        
        <RecargaContext.Provider value={{ recarga, setRecarga }}>
            {children}
        </RecargaContext.Provider>

    )
}


