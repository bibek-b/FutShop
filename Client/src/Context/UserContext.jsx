import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import {jwtDecode} from 'jwt-decode';
import apiCall from "../Custom-Hooks/apiCall";
import Cookies from 'js-cookie';

export const UserContext = createContext();

export const UserContextProvider = ({children}) => {
const [user, setUser] = useState(null);
const [isLoggedIn, setIsLoggedIn] = useState(false);

useEffect(() => {
    const token = Cookies.get('token'); 
    if(!token) return;
        const decoded = jwtDecode(token);
        
        const fetchUser = async () => {
            const res = await apiCall.get("/users/"+decoded.userId);
            setUser(res.data);
        }
        fetchUser();
    },[isLoggedIn]);

    const handleLogout = () =>  {
        Cookies.remove('token');
        setUser(null);
    }
    return <UserContext.Provider value={{user, isLoggedIn, setIsLoggedIn, handleLogout}}>
        {children}
    </UserContext.Provider>
}