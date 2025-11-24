import { configureStore } from "@reduxjs/toolkit";  
import counterReduce from './counterSlice';
import profileReduce from './profileSlice';
// import itemReduce from './itemSlice';
import { itemsApi } from "./itemSlice";
export const store = configureStore({
    reducer: {
        counter: counterReduce,
        profile: profileReduce,
        // items: itemReduce,
        [itemsApi.reducerPath] : itemsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(itemsApi.middleware)
});