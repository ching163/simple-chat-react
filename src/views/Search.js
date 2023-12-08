import React, { useState, useEffect } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy';
import { FaAngleLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import SearchItem from '../components/SearchItem';

const Search = () => {
    const navigate = useNavigate();
    const [searchUsername, setSearchUsername] = useState('');
    const apiError = useStoreState((state) => state.apiError);
    const foundUsers = useStoreState((state) => state.foundUsers);
    const setFoundUsers = useStoreActions((action) => action.setFoundUsers);
    const searchUsers = useStoreActions((action) => action.searchUsers);
    const loginUsername = localStorage.getItem('loginUsername');

    useEffect(() => {
        // back to login after logout
        if (!loginUsername) {
            navigate('/login');
            return;
        }

        setFoundUsers([]);
    }, [])

    const handleSearch = (e) => {
        e.preventDefault();
        searchUsers(searchUsername);
    }

    const handleBack = () => {
        navigate('/chat');
    }

    return (
        <main className='search-page'>
            <form className='searchForm' onSubmit={handleSearch}>
                <div className='search-header'>
                    <FaAngleLeft className='back-icon' onClick={handleBack} />
                    <h1>Search</h1>
                </div>
                <div className='search-bar'>
                    <input
                        id='searchUsername'
                        type='text'
                        required
                        autoFocus
                        value={searchUsername}
                        onChange={(e) => setSearchUsername(e.target.value)}
                    />
                    <button type='submit'>Search</button>
                </div>
            </form>
            {!apiError && foundUsers.length > 0 &&
                <>
                    <div className='search-container'>
                        {foundUsers.map((user) => {
                            return <SearchItem key={user._id} foundUser={user} />;
                        })}
                    </div>
                </>
            }
            {!apiError && foundUsers.length == 0 && <p>No user is found</p>}
            {apiError && <p className='error-msg'>{apiError}</p>}

        </main>
    )
}

export default Search