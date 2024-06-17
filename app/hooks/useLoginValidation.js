'use client'

import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUserData } from '../store/slices/userSlice';

export const useLoginValidation = () => {
    const [ErrorLogin, setErrorLogin] = useState(null);
    const dispatch = useDispatch();

    const validateLogin = async (email, password) => {
        try {
            const requestOptions = {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                data: {
                    action: "login",
                    email: email,
                    password: password,
                }
            };

            const response = await axios("/api", requestOptions);

            if (response.data.success) {
                // console.log(response.data.token);
                sessionStorage.setItem("ebc_loggedIn", true);
                sessionStorage.setItem("ebc_userData", JSON.stringify(response.data.userData));
                sessionStorage.setItem("ebc_token", JSON.stringify(response.data.token));
                
                dispatch(setUserData(response.data.userData));

                return { success: true,  ebc_token: JSON.stringify(response.data.token)};
            } else {
                setErrorLogin(response.data.errorMessage);
                return { success: false, error: response.data.errorMessage };
            }
        } catch (error) {
            setErrorLogin("Error de red");
            return { success: false, error: "Error de red" };
        }
    };

    return { ErrorLogin, validateLogin };
};

