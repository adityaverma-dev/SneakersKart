import React, { useState } from "react";
import {Modal, Button} from 'react-bootstrap'


const PicViewer = ({formik, deletePic}) => {
    const [idToDelete, setIdToDelete] = useState(null)
    const [show, setShow] = useState(false)

    const handeClose = () => setShow(false)
    const handleShow = (index) => {
        setIdToDelete(index)
        setShow(true)
    }
    const confirmDelete = () => {
        deletePic(idToDelete)
  handeClose();
        setIdToDelete(null);
    }



return (
    <>
    { formik.values && formik.values.images ? 
    formik.values.images.map((item, i) => (
        <div key={item}
        className="pic_block"
        onClick={ () => handleShow(i)  }
        style={{
            background: `url(${item})`
        }}

        
        >
            

        </div>  
))

    : null }

    <Modal
    show ={show} onHide={handeClose}
    
    >
        <Modal.Header closeButton>
            <Modal.Title>
                Confirm Delete
            </Modal.Title>

        </Modal.Header>
        <Modal.Body>
            Are you sure you want to delete this
        </Modal.Body>
        <Modal.Footer>
            <Button variant="seondary" onClick={handeClose}>
                Close

            </Button>
            <Button variant="danger" onClick={confirmDelete}>
                Delete it

            </Button>
        </Modal.Footer>

    </Modal>

    
    
    </>
)

}

export default PicViewer;