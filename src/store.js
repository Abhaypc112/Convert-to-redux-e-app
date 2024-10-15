import { configureStore } from "@reduxjs/toolkit";
import authSlice from './Slices/Authentication/loginslice'

const store = configureStore({
    reducer:{
        auth: authSlice,
    }
})
export default store;