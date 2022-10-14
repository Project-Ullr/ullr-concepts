import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const NavBar = () => {
    const nav = useNavigate()

    const handleLogout = () => {
        axios.get('http://localhost:8000/api/users/logout', { withCredentials: true })
            .then(() => nav('/login'))
    }

    return (
        <div className='fixed top-0 left-0 right-0 px-10 py-5 text-neutral-100 bg-neutral-800 flex items-center justify-between'>
            <p className='text-3xl'>project-ullr</p>
            <ul>
                <li>
                    <button className='border-2 border-neutral-100 font-semibold px-3 py-1 rounded-full transition-colors hover:bg-neutral-100 hover:text-neutral-900' onClick={handleLogout}>Logout</button>
                </li>
            </ul>
        </div>
    )
}