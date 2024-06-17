
import { useEffect, useState } from "react";
import { logoutUser, useLoginValidation } from '@/hooks';
import { useRouter } from "next/navigation";

export const useCheckAuthentication = () => 
{
    const router = useRouter();

    const [authenticated, setAuthenticated] = useState(false);
    const { validateLogin } = useLoginValidation();

    useEffect(() => 
    {
        const checkAuthentication = async () => 
        {
            let email = "";
            let password = "";

            // para no tener que estar guardando la contraseña en la session de localstorage, le cojo directamente de la session php
            // const loggedIn = JSON.parse(sessionStorage.getItem("ebc_userData"));
            // if (loggedIn) 
            // {
            //     email = loggedIn.socio_Email;
            //     password = loggedIn.socio_Pass;
            // } // fin if (loggedIn)

            const loginResult = await validateLogin(email, password);

            if (!loginResult.success) 
            {
                logoutUser();
                router.push('/login');
            } // fin if (!loginResult.success) 
            else 
                setAuthenticated(true);
    
        };

        checkAuthentication();
    }, []);

    return authenticated;
};
