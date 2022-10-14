import React from 'react'
import { Link } from 'react-router-dom'
import { LoginForm } from '../components/LoginForm'

export const LoginPage = () => {
    return (
        <div className='bg-white w-[500px] mt-[5rem] mx-auto p-5 shadow-2xl border-4 border-neutral-800'>
            <LoginForm />
        </div>
    )
}