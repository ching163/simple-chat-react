import React from 'react'
import { useEffect } from 'react';
import { useStoreState, useStoreActions } from "easy-peasy";
import ContactItem from '../components/ContactItem';
import { Link, useNavigate } from 'react-router-dom';

const Chat = () => {
    const navigate = useNavigate();
    const apiError = useStoreState((state) => state.apiError);
    const contactList = useStoreState((state) => state.contactList);
    const getContactList = useStoreActions((action) => action.getContactList);
    const userLogout = useStoreActions((action) => action.userLogout);
    const loginUsername = localStorage.getItem('loginUsername');

    // get contact list onload
    useEffect(() => {
        // back to login after logout
        if (!loginUsername) {
            navigate('/login');
            return;
        }

        getContactList();

        // add repeat timer to get latest contact list
        const interval = setInterval(() => {
            getContactList();
        }, 2000);
        return () => {
            clearInterval(interval);
        }
    }, []);

    const handleLogout = () => {
        userLogout();
        navigate('/login');
    }

    return (
        <main className='chat-page'>
            <div className='chat-header'>
                <h1>{loginUsername}'s Chat</h1>
                <Link to={`/search`}>Search User</Link>
                <button onClick={handleLogout}>Logout</button>
            </div>
            {apiError && <p className='error-msg'>{apiError}</p>}
            {contactList.length > 0 &&
                <>
                    <div className='contact-container'>
                        {contactList.map((contact) => {
                            return <ContactItem key={contact._id.contact} contact={contact} />
                        })}
                    </div>
                </>
            }
        </main>
    )
}

export default Chat