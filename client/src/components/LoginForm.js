import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

export const LoginForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const nav = useNavigate()

    const handleSubmit = e => {
        e.preventDefault()

        axios.post('http://localhost:8000/api/users/login', {
            email,
            password,
        }, { withCredentials: true })
            .then(response => {
                nav('/')
            })
            .catch(error => {
                nav('/login')
            })
    }

    return (
        <form className='mx-auto flex flex-col items-center justify-start gap-5 w-2/3' onSubmit={handleSubmit}>
            <h1 className='text-4xl font-bolder border-b-4 border-black pb-3'>Login</h1>
            {/* email */}
            <div className='flex items-center justify-between gap-10 w-full'>
                <label htmlFor="email">Email</label>
                <input className='border-2 border-neutral-800' type="email" name="email" id="email" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            {/* password */}
            <div className='flex items-center justify-between gap-10 w-full'>
                <label htmlFor="password">Password</label>
                <input className='border-2 border-neutral-800' type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <input type="submit" value="Submit" className='w-full bg-purple-400 py-2 hover:bg-purple-300 transition-colors cursor-pointer' />
            <Link to='/register' className='border-t-2 border-neutral-800 px-4 py-1'>Click to Register</Link>
        </form>
    )
}
