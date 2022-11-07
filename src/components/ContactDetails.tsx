import React, { useState } from 'react'
import { Contact } from '../models/contacts.model';
import { useContactQuery, useUpdateConactMutation, useDeleteConactMutation } from '../services/contactsApi';
import { Popup } from './Popup';


interface Props {
   id:string
}

export const ContactDetails: React.FC<Props> = ({ id }) => {
    const [usename, setUsername] = useState<string>("");
    const [updatedId, setUpdatedId] = useState<string>('');
    const [email, setEmail] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { data } = useContactQuery(id); //it exports the api data, isloading,isFetching,error and isSucess
    const [updateConact] = useUpdateConactMutation();
    const [deleteConact] = useDeleteConactMutation();

    const updateHandular = (data: Contact | any) => {
        setUpdatedId(data.id);

        console.log(data);

        setUsername(data.name);
        setEmail(data.email);
        setIsOpen(!isOpen);
        // let stringID = JSON.stringify(id);
        // let contact = {
        //     id: stringID,
        //     name: "ashok updated",
        //     email: 'ashok@gmail.com'
        // }
        // console.log(contact);

        // updateConact(contact);

    }

    function cancel() {
        setIsOpen(!isOpen);
    }


    const updateProductItem = (): void => {

        setIsOpen(!isOpen);
    }

    const deleteHandular = (id: string | any): void => {
        deleteConact(id)
    }

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        let updateContact = {
            'id': updatedId,
            'name': usename,
            'email': email
        }
        // let obje
        updateConact(updateContact);
        setIsOpen(!isOpen);
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
                <button onClick={() => updateHandular(data)}>Update</button>
                <button onClick={() => deleteHandular(data?.id)}>Delete</button>
            </div>

            {
                isOpen && <Popup content={
                    <div className='updatedPopup'>
                        <h3>Update product</h3>
                        <div className='cartView'>
                            <form onSubmit={(e) => onSubmit(e)} className="">
                                <div className='flex_column'>
                                    <label htmlFor="name">User Name</label>
                                    <input type="text" name="name" id="name" value={usename} placeholder='Enter Name' onChange={e => setUsername(e.target.value)} required />
                                    <label htmlFor="mail">Email</label>
                                    <input type="text" name="mail" id="mail" value={email} placeholder='Enter Name' onChange={e => setEmail(e.target.value)} required />
                                </div>
                                <button type='button' onClick={() => cancel()}>Cancel</button>
                                <button type='submit'>update</button>
                            </form>
                        </div>
                    </div>} handleClose={updateProductItem} />
            }
        </div>
    )
}
