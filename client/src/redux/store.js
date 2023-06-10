import { configureStore } from "@reduxjs/toolkit";
import { shazamCoreApi } from "../API/ShazamCore";
import playerReducer from './features/playerSlice';
import notificationReducer from './features/notificationSlice';
export const store = configureStore({
    reducer: {
        [shazamCoreApi.reducerPath]: shazamCoreApi.reducer,
        player:playerReducer,
        notifications:notificationReducer
        
    },
    middleware:(getDefaultMiddleWare)=>getDefaultMiddleWare().concat(shazamCoreApi.middleware),
});