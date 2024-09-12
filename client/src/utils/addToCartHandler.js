import React from "react";
import {Modal, Button} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const AddToCartHandler = ({modal, handleclose, errorType}) => {
    return(
        <>
        <Modal show={modal} onHide={handleclose} centered>
            <Modal.Header
            closeButton>
                <Modal.Title>Sorry </Modal.Title>

            </Modal.Header>
            <Modal.Body>
                { errorType === 'auth' ? 
                <div>Sorry you need to register</div>
            
            : 
               <div>You need to verify to continue</div>
            
            }


            </Modal.Body>
            <Modal.Footer>
                {errorType === 'auth' ? 
                <LinkContainer
                to='/sign_in'>
                <Button variant="primary">
                    Go  to Register/ Signin
                </Button>
                
                
                
                
                
                </LinkContainer>
                :
                <Button
                variant="primary"
                onClick={() => alert('trigger')}
                >
                    Send email verification again
                </Button>
                }
            </Modal.Footer>

        </Modal>
        </>

    )

}

export default AddToCartHandler;

