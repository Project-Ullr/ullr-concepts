import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

export const RegisterForm = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const nav = useNavigate()

    const handleSubmit = e => {
        e.preventDefault()

        axios.post('http://localhost:8000/api/users/register', {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
        }, { withCredentials: true })
            .then(response => {
                console.log(response)
                nav('/')
            })
            .catch(error => {
                console.log(error)
                nav('/register')
            })
    }

    return (
        <form className='mx-auto flex flex-col items-center justify-start gap-5 w-2/3' onSubmit={handleSubmit}>
            <h1 className='text-4xl font-bolder border-b-4 border-black pb-3'>Register</h1>
            {/* first name */}
            <div className='flex items-center justify-between gap-10 w-full'>
                <label htmlFor="firstName">First Name</label>
                <input className='border-2 border-neutral-800' type="text" name="firstName" id="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} />
            </div>
            {/* last name */}
            <div className='flex items-center justify-between gap-10 w-full'>
                <label htmlFor="lastName">Last Name</label>
                <input className='border-2 border-neutral-800' type="text" name="lastName" id="lastName" value={lastName} onChange={e => setLastName(e.target.value)} />
            </div>
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
            {/* confirmation password */}
            <div className='flex items-center justify-between gap-10 w-full'>
                <label htmlFor="confirmPassword">Confirm</label>
                <input className='border-2 border-neutral-800' type="password" name="confirmPassword" id="confirmPassword" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
            </div>
            <input type="submit" value="Submit" className='w-full bg-purple-400 py-2 hover:bg-purple-300 transition-colors cursor-pointer' />
            <Link to='/login' className='border-t-2 border-neutral-800 px-4 py-1'>Return to Login</Link>
        </form>
    )
}
