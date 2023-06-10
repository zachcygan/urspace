import { createSlice } from "@reduxjs/toolkit";

const initialState={
    message:'',
    type:'',
    visible:false
};

export const notificationSlice=createSlice({

    name:'notification',
    initialState,
    reducers:{
        showNotification:(state,action)=>{
            state.message = action.payload.message;
            state.type = action.payload.type;
            state.visible = true;
        },
        hideNotification:(state)=>{
            state.message = '';
            state.type = '';
            state.visible = false;
        }

    }
});

export const {showNotification,hideNotification}=notificationSlice.actions;

export default notificationSlice.reducer;