import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useStoreState, useStoreActions } from 'easy-peasy';

const Login = () => {
    const navigate = useNavigate();
    const [loginSuccess, setLoginSuccess] = useState(null);
    const apiError = useStoreState((state) => state.apiError);
    const username = useStoreState((state) => state.username);
    const password = useStoreState((state) => state.password);
    const userLogin = useStoreActions((action) => action.userLogin);
    const setUsername = useStoreActions((action) => action.setUsername);
    const setPassword = useStoreActions((action) => action.setPassword);

    const handleLogin = async (e) => {
        e.preventDefault();
        const loginUser = { username: username, password: password };
        const result = await userLogin(loginUser);
        setLoginSuccess(result);
    }

    useEffect(() => {
        if (loginSuccess) {
            setLoginSuccess(false);
            navigate('/chat');
        }
    }, [loginSuccess])

    return (
        <main className='login-page'>
            <form onSubmit={handleLogin}>
                <div className='login-header'>
                    <h1>Login</h1>
                </div>
                <label htmlFor='username'>Username:</label>
                <input
                    id='username'
                    type='text'
                    required
                    autoFocus
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor='password'>Password:</label>
                <input
                    id='password'
                    type='password'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {apiError && <label className='error-msg'>{apiError}</label>}
                <button type='submit'>Login</button>
            </form>
        </main>
    )
}

export default Login