import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "store/features/userSlice";
import { useNavigate } from 'react-router-dom';


const PrevenSigninRoute = (props) => {
const users = useSelector(selectUser)
const navigate = useNavigate();

    return(
        <>
         
         { users.auth ? 
         

          navigate('/dashboard')

        
         
         
         :
         props.children

         }

        
        </>
    )
}

export default PrevenSigninRoute