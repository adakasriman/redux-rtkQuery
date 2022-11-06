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
        }),
        addConact: builder.mutation<void /*addContact is used send new record to the server*/, Contact /* Contact is interface of the new record */>({
            query: contact/*new record*/ => ({
                url: '/contacts',
                method: "POST",
                body: contact
            })
        }),
        updateConact: builder.mutation<void /*addContact is used send new record to the server*/, Contact /* Contact is interface of the new record */>({
            query: (id, ...rest)/*new record*/ => ({
                url: `/contacts/${id}`,
                method: "PUT",
                body: rest
            })
        }),
        deleteConact: builder.mutation<void /*addContact is used send new record to the server*/, string /* Contact is interface of the new record */>({
            query: (id)/*new record*/ => ({
                url: `/contacts/${id}`,
                method: "DELETE",
                // body: 
            })
        })
    })
})

export const { useContactsQuery, useContactQuery, useUpdateConactMutation, useAddConactMutation, useDeleteConactMutation } = contactsApi;

//the above hooks for storing data  : hooks



/* 
Mutations 
      --> Mutatations are used to send data to the server and apply the changes to the local cache.
      --> Mutations can also invalidate cached data and force re-fetchs.
 */