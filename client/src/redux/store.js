import { configureStore } from "@reduxjs/toolkit";
import { shazamCoreApi } from "../API/ShazamCore";
import playerReducer from './features/playerSlice';

export const store = configureStore({
    reducer: {
        [shazamCoreApi.reducerPath]: shazamCoreApi.reducer,
        player:playerReducer,
        
    },
    middleware:(getDefaultMiddleWare)=>getDefaultMiddleWare().concat(shazamCoreApi.middleware),
});