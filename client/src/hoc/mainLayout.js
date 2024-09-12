import React, { useEffect } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { showToast } from 'utils/tools'
import { useSelector, useDispatch } from 'react-redux';
import { selectNotification, clearNotification } from 'store/features/notificationSlice';

const MainLayout = (props) => {
const notifications = useSelector(selectNotification)
const dispatch = useDispatch()
    useEffect(() => {
        if(notifications && notifications.error){
            const msg = notifications.msg ? notifications.msg : 'Error'
            showToast('ERROR', msg)
         }
 if(notifications && notifications.success){
    const msg = notifications.msg ? notifications.msg : 'Success'
    showToast('SUCCESS', msg)
    setTimeout(() => {
        dispatch(clearNotification());
    }, 100);
 }
    }, [notifications, dispatch])

    return (
        <>
        {props.children}
        <ToastContainer/>

        </>
    )


}


export default MainLayout;