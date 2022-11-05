import React from 'react'
import { useContactQuery } from '../services/contactsApi';

export const ContactDetails = ({ id }: { id: string }) => {
    const { data } = useContactQuery(id); //it exports the api data, isloading,isFetching,error and isSucess
    return (
        <div>{
            JSON.stringify(data, undefined, 2)}</div>
    )
}
