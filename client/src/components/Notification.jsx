import React from 'react';
import { useEffect } from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {motion} from 'framer-motion';
import { hideNotification,showNotification } from '../redux/features/notificationSlice';

const Notification = () => {

    const dispatch = useDispatch();
    const {message,type,visible} = useSelector((state)=>state.notifications); 

    useEffect(()=>{
        const storedNotification = localStorage.getItem('notification');
        if(storedNotification){
            const {message,type} = JSON.parse(storedNotification);
            dispatch(showNotification({message,type}));

            setTimeout(()=>{
                dispatch(hideNotification());
                localStorage.removeItem('notification');
            },3000);
        }
    },[dispatch,visible]);
    if(!visible){
        return null;
    }
    const colors = {
        success: {
          bg: 'bg-teal-100',
          border: 'border-teal-500',
          text: 'text-teal-900'
        },
        error: {
          bg: 'bg-red-100',
          border: 'border-red-500',
          text: 'text-red-900'
        }
      };
      const color = colors[type] || colors.success;
    return(
        <motion.div 
          className={`${color.bg} ${color.border} ${color.text} border-t-4 rounded-b px-4 py-3 shadow-md rounded-xl mr-10`}
          role="alert"
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ ease: "easeOut", duration: 0.3 }}
        >
            <div className="flex">
                <div className="py-1">
                    <svg className="fill-current h-6 w-6 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg>
                </div>
                <div>
                    <p className="font-bold">{message}</p>
                </div>
            </div>
        </motion.div>
    )
};

export default Notification;