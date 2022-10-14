import React from 'react'
import { RegisterPage } from './views/RegisterPage'
import { LoginPage } from './views/LoginPage'
import { Dashboard } from './views/Dashboard'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

export const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage />} />
            </Routes>
        </BrowserRouter>
    )
}