import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useStoreState, useStoreActions } from 'easy-peasy';

const Register = () => {
  const navigate = useNavigate();
  const [regSuccess, setRegSuccess] = useState(null);
  const apiError = useStoreState((state) => state.apiError);
  const regUsername = useStoreState((state) => state.regUsername);
  const regPassword = useStoreState((state) => state.regPassword);
  const addUser = useStoreActions((action) => action.addUser);
  const setRegUsername = useStoreActions((action) => action.setRegUsername);
  const setRegPassword = useStoreActions((action) => action.setRegPassword);

  const handleRegister = async (e) => {
    e.preventDefault();
    const newUser = { username: regUsername, password: regPassword };
    const result = await addUser(newUser);
    setRegSuccess(result);
  }

  useEffect(() => {
    if (regSuccess) {
      setRegSuccess(false);
      navigate('/login');
    }
  }, [regSuccess])

  return (
    <main className='register-page'>
      <form onSubmit={handleRegister}>
        <div className='register-header'>
          <h1>Register New User</h1>
        </div>
        <label htmlFor='username'>Username:</label>
        <input
          id='username'
          type='text'
          required
          autoFocus
          value={regUsername}
          onChange={(e) => setRegUsername(e.target.value)}
        />
        <label htmlFor='password'>Password:</label>
        <input
          id='password'
          type='password'
          required
          value={regPassword}
          onChange={(e) => setRegPassword(e.target.value)}
        />
        {apiError && <label className='error-msg'>{apiError}</label>}
        <button type='submit'>Register</button>
      </form>
    </main>
  )
}

export default Register