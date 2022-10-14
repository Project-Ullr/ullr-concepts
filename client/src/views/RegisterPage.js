import React from 'react'
import { RegisterForm } from '../components/RegisterForm'
import { Link } from 'react-router-dom'

export const RegisterPage = () => {
    return (
        <div className='bg-white w-[500px] mt-[5rem] mx-auto p-5 shadow-2xl border-4 border-neutral-800'>
            <RegisterForm />
        </div>
    )
}