import React, { useState } from "react";
import { Button } from '@mui/material';
import AuthForm from "./authForm";
import PrevenSigninRoute from "hoc/preventSigninRoute";

const RegisterLogin = (props) => {

    const [formType, setFormType] = useState(false);

    const toogleFormType = () => {
        setFormType(!formType);
    }


    return(
<PrevenSigninRoute>

        <div className="page_wrapper">
            <div className="container">
                <div className="register_login_container">
                    <div className="left">
                        { formType ?
                        <>
                        <h1>New Customers</h1>
                        <p>If you are a new customer, you need to first create an account</p>
                        
                        </>
                        :
                        <>
                        <h1>Welcome Back</h1>
                        <p>Enter your details to log in to your account.</p>
                        
                        </>

                        }
                        <Button
                        variant="contained"
                        size="small"
                     onClick={()=> toogleFormType()}
        
                        
                        >
                            { formType ? "Already Registered" : "Need to Register"}

                        </Button>

                    </div>
                    <div className="right">
                        <h2>
                            {formType ? 'Register' : 'Sign in'}
                            <AuthForm 
                            formType={formType}
                            {...props}
                            
                            />
                        </h2>

                    </div>

                </div>

            </div>
        </div>
        </PrevenSigninRoute>
    )
}


export default RegisterLogin