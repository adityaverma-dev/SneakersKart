import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "store/features/userSlice";
import Loader from "utils/loader";
import { useNavigate } from 'react-router-dom';

export default function authGuard(ComposedComponent){
    return function AuthenticationCheck(props) {
        const[isAuth, setIsAuth] = useState(false);
        const users = useSelector(selectUser)
        const navigate = useNavigate();

        useEffect(() => {
            if(!users.auth){
                navigate('/');
            } else {
                setIsAuth(true);
            }
        }, [users.auth, navigate]);

        if (!isAuth) {
            return <Loader full={true} />;
        } else {
            return <ComposedComponent users={users} {...props} />;
        }
    }
}