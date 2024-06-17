'use client';
import {

    HiMiniUser,
    HiMiniLockClosed,
    HiMiniChevronRight
} from "react-icons/hi2";

import { Button } from '@/components';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { logoutUser, useForm, useLoginValidation } from '@/hooks';
import toast from 'react-hot-toast';


export default function LoginForm() {

    const router = useRouter();
    const { validateLogin } = useLoginValidation(); 

    const InputForm = "peer block w-full rounded-sm border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500";
    const IconForm = "pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900";
    const LaberForm = "mb-3 mt-5 block text-md font-medium text-gray-900";
    const errorMessage = "";
 
    const {formState, onInputChange} = useForm({
        email: "programacion@nubeado.com",
        password: "admin22"
    });
    const {email, password} = formState;

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const checkAuthentication = async () => {
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

            if (loginResult.success) 
                router.push('/dashboard');
            else 
            {
                logoutUser();
                setLoading(true);
            }// fin  if (loginResult.success) 

        };
    
        checkAuthentication();
    }, [router, validateLogin]);


    const handleSubmit = async (event) => {
        event.preventDefault();

        const loginResult = await validateLogin(email, password);

        if (loginResult.success) 
            router.push('/dashboard');
        else 
        {
            toast.error(loginResult.error);
            setLoading(true);
        }// fin else de if (loginResult.success) 
    };

    // PARA QUE NO MUESTRE NADA
    if (!loading) {
        return null;
    }

    return (

        <form className="space-y-3" noValidate="novalidate" onSubmit={handleSubmit}>
            <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
                <h1 className="mb-3 text-center text-1">
                    Por favor inicie sesión.
                </h1>
                <div className="w-full">
                    <div>
                        <label
                            className={LaberForm}
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <div className="relative">
                            <input
                                className={InputForm}
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={email} 
                                onChange={onInputChange}
                                required
                            />
                            <HiMiniUser className={IconForm} />
                        </div>
                    </div>
                    <div className="mt-4">
                        <label
                            className={LaberForm}
                            htmlFor="password"
                        >
                            Contraseña
                        </label>
                        <div className="relative">
                            <input
                                className={InputForm}
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Enter password" 
                                value={password} 
                                onChange={onInputChange}
                                required
                                minLength={6}
                            />
                            <HiMiniLockClosed className={IconForm} />
                        </div>
                    </div>
                </div>
                <LoginButton />
                <div
                    className="flex h-8 items-end space-x-1"
                    aria-live="polite"
                    aria-atomic="true"
                >
                    {errorMessage && (
                        <>
                            <p className="text-sm text-red-500">{errorMessage}</p>
                        </>
                    )}
                </div>
            </div>

        </form>
    );
}

function LoginButton() {

    return (
        <Button className="mt-4 w-full rounded-sm bg-[#002432] hover:bg-[#d0a53d]">
            Iniciar sesión <HiMiniChevronRight className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
    );
}