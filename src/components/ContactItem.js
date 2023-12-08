import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { format } from 'date-fns';

const ContactItem = ({ contact }) => {
    const navigate = useNavigate();
    const setSelectedContact = useStoreActions((action) => action.setSelectedContact);
    const lastMsgAt = new Date(contact.lastMsgAt);

    const handleSelectUser = () => {
        setSelectedContact(contact.contact);
        navigate('/message');
    }

    return (
        <div className='contact-item' onClick={handleSelectUser}>
            <h2>{contact.contact}</h2>
            <p>Last Message At: {format(lastMsgAt, "yyyy-MM-dd HH:mm:ss")}</p>
        </div>
    )
}

export default ContactItem