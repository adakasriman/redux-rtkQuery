import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Contact } from "../models/contacts.model";

export const contactsApi = createApi({ //contactApi reducer
    reducerPath: "contactsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3006/" }), // here we were creating baseurl
    tagTypes: ['Contact'], // When ever the data is updated, inserted or deleted from the server, it updates the data.
    endpoints: (builder) => ({     // bulider can build the endPoints                                     
        contacts: builder.query<Contact[], void>({
            query: () => '/contacts', // contacts is end point of the server
            providesTags: ['Contact']  // updating data 
        }),
        contact: builder.query<Contact, string>({
            query: (id) => `/contacts/${id}`,  //getting data of id
            providesTags: ['Contact']  // updating data 
        }),
        addConact: builder.mutation<void /*addContact is used send new record to the server*/, Contact /* Contact is interface of the new record */>({
            query: contact/*new record*/ => ({ // contact is new record
                url: '/contacts',
                method: "POST",
                body: contact
            }),
            invalidatesTags: ['Contact'] // updating data 
        }),
        updateConact: builder.mutation<void, Contact /* Contact is interface of the new record */>({
            query: (contact)/*new record*/ => ({
                url: `/contacts/${contact.id}`,  // updating based on id 
                method: "PUT",
                body: contact
            }),
            invalidatesTags: ['Contact'] // updating data 
        }),
        deleteConact: builder.mutation<void, string>({
            query: (id)/*new record*/ => ({
                url: `/contacts/${id}`,  // deleteong contact based on id 
                method: "DELETE",
                // body: 
            }),
            invalidatesTags: ['Contact'] // updating data 
        })
    })
})

export const { useContactsQuery, useContactQuery, useUpdateConactMutation, useAddConactMutation, useDeleteConactMutation } = contactsApi;

//the above hooks for get and storing data into the server : hooks



/* 
builder.query: 
  --> query is used only to get data from the server.

builder.mutation:
      --> Mutatations are used to send data to the server and apply the changes to the local cache.
      --> Mutations can also invalidate cached data and force re-fetchs.
 */