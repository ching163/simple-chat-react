import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { useStoreState, useStoreActions } from "easy-peasy";
import { FaAngleLeft } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import MessageItem from '../components/MessageItem';

const Message = () => {
    const navigate = useNavigate();
    const ref = useRef(null);
    const [messageContent, setMessageContent] = useState('');
    const selectedContact = useStoreState((state) => state.selectedContact);
    const messageList = useStoreState((state) => state.messageList);
    const getMessageList = useStoreActions((action) => action.getMessageList);
    const sendMessage = useStoreActions((action) => action.sendMessage);
    const loginUsername = localStorage.getItem('loginUsername');

    const scrollToLatestMsg = () => {
        const lastChildElement = ref.current?.lastElementChild;
        lastChildElement?.scrollIntoView({ behavior: 'smooth' });
    }

    // load message list onload
    useEffect(() => {
        // back to login after logout
        if (!loginUsername) {
            navigate('/login');
            return;
        }

        getMessageList();
        setTimeout(() => {
            scrollToLatestMsg();
        }, 500);

        // add repeat timer to get latest message list
        const interval = setInterval(() => {
            getMessageList();
        }, 2000);
        return () => {
            clearInterval(interval);
        }
    }, []);

    const handleSendMessage = (e) => {
        e.preventDefault();
        const loginUsername = localStorage.getItem('loginUsername');
        const newMsg = { fromUser: loginUsername, toUser: selectedContact, content: messageContent };
        sendMessage(newMsg);
        setMessageContent('');
    }

    const handleBack = () => {
        navigate('/chat');
    }

    return (
        <main className='message-page'>
            <div className='message-header'>
                <FaAngleLeft className='back-icon' onClick={handleBack} />
                <h1>Message</h1>
            </div>
            <h2>{selectedContact}</h2>
            <div className='message-container' ref={ref}>
                {messageList.map((message) => {
                    return <MessageItem key={message._id} message={message} />
                })}
            </div>

            <form className='messageForm' onSubmit={handleSendMessage}>
                <textarea
                    id='messageContent'
                    required
                    value={messageContent}
                    onChange={(e) => { setMessageContent(e.target.value) }}
                />
                <button type='submit'>Send</button>
            </form>
        </main>
    )
}

export default Message