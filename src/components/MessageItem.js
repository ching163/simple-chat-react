import React from 'react'
import { format } from 'date-fns';

const MessageItem = ({ message }) => {
    const messageTs = new Date(message.createdAt);
    const loginUsername = localStorage.getItem('loginUsername') || '';
    const messageClass = (message.fromUser == loginUsername ? ' send-msg' : ' receive-msg')

    return (
        <div className={`message-item${messageClass}`}>
            <p>{message.content}</p>
            <p className='message-date'>{format(messageTs, "yyyy-MM-dd HH:mm:ss")}</p>
        </div>
    )
}

export default MessageItem