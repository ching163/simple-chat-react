import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <main className='home-page'>
            <h1>Simple Chat System</h1>
            <Link to={`/register`}><button className='link-button'>Register</button></Link>
            <Link to={`/login`}><button className='link-button'>Login</button></Link>
        </main>
    )
}

export default Home