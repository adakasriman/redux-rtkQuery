import { configureStore } from "@reduxjs/toolkit";
import { contactsApi } from "./services/contactsApi";

export const store = configureStore({
    reducer: {
        [contactsApi.reducerPath]: contactsApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(contactsApi.middleware)
})


// middleware for caching data and pulling data into server