import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useStoreActions } from 'easy-peasy';

const SearchItem = ({ foundUser }) => {
    const navigate = useNavigate();
    const setSelectedContact = useStoreActions((action) => action.setSelectedContact);

    const handleSelectUser = () => {
        setSelectedContact(foundUser.username);
        navigate('/message');
    }

    return (
        <div className='search-item' onClick={handleSelectUser}>
            {foundUser.username}
        </div>
    )
}

export default SearchItem