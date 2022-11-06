import React from 'react'
import { Contact } from '../models/contacts.model';
import { useContactQuery, useUpdateConactMutation, useDeleteConactMutation } from '../services/contactsApi';

export const ContactDetails = ({ id }: { id: string }) => {
    const { data } = useContactQuery(id); //it exports the api data, isloading,isFetching,error and isSucess
    const [updateConact] = useUpdateConactMutation();
    const [deleteConact] = useDeleteConactMutation();
    const updateHandular = (id: any) => {
        let stringID = JSON.stringify(id);
        let contact = {
            id: stringID,
            name: "ashok updated",
            email: 'ashok@gmail.com'
        }
        console.log(contact);
        
        updateConact(contact);

    }

    const deleteHandular = (id: any) => {
        deleteConact(id)
    }


    return (
        <div className=''>
            <div>
                name:  {data?.name}
            </div>
            <div>
                email: {data?.email}
            </div>
            <div className='spaceBetween'>
                <button onClick={() => updateHandular(data?.id)}>Update</button>
                <button onClick={() => deleteHandular(data?.id)}>Delete</button>
            </div>
        </div>
    )
}
