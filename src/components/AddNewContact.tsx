import React, { useState } from 'react';
import { useAddConactMutation, useContactsQuery } from '../services/contactsApi';
import { Contact } from "../models/contacts.model";


export const AddNewContact:React.FC = () => {
    const [usename, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const { data, refetch } = useContactsQuery();
    const [addContact] = useAddConactMutation();

    const addNewContact = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(data?.length);
        let lastObject = data?.at(-1)
        let newId: any = lastObject?.id;

        let newContact = {
            'id': newId + 1,
            'name': usename,
            'email': email
        }

        console.log(newContact);

        await addContact(newContact);
        // refetch();
        setUsername("");
        setEmail("");


    }
    return (
        <form className='add_form' onSubmit={addNewContact}>
            <h4>Add Contact</h4>
            <div className='flex_column'>
                <label htmlFor="name">User Name</label>
                <input type="text" name="name" id="name" value={usename} placeholder='Enter Name' onChange={e => setUsername(e.target.value)} required />
                <label htmlFor="mail">Email</label>
                <input type="text" name="mail" id="mail" value={email} placeholder='Enter Name' onChange={e => setEmail(e.target.value)} required />
                <button type="submit">add</button>
            </div>
        </form>
    )
}
