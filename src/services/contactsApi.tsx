import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Contact } from "../models/contacts.model";

export const contactsApi = createApi({
    reducerPath: "contactsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3006/" }), // here we were creating baseurl
    endpoints: (builder) => ({                                          // bulider can build end points
        contacts: builder.query<Contact[], void>({
            query: () => '/contacts'
        }),
        contact: builder.query<Contact, string>({
            query: (id) => `/contacts/${id}`
        })
    })
})

export const { useContactsQuery, useContactQuery } = contactsApi;

//the above hooks for storing data  : hooks