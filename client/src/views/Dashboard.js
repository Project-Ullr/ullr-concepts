import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavBar } from '../components/NavBar'
import { useNavigate } from 'react-router-dom'
import { LeafletMap } from '../components/LeafletMap'

export const Dashboard = () => {
    const nav = useNavigate()

    const [user, setUser] = useState({})
    const [requestid, setRequestid] = useState('')

    // check if user is logged in.
    useEffect(() => {
        axios.get('http://localhost:8000/api/users/getLoggedInUser', { withCredentials: true })
            .then(response => {
                setUser(response.data)
            })
            .catch(err => {
                nav('/login')
            })
        // eslint-disable-next-line
    }, [])

    const handleSubmit = e => {
        e.preventDefault()
        axios.put(`http://localhost:8000/api/users/${requestid}/addFriend`, {
            userid: user._id
        }, { withCredentials: true })
            .then(() => {
                setRequestid('')
            })
    }

    return (
        <>
            <NavBar />
            <div className='container mx-auto bg-white shadow-2xl p-10 mt-[100px]'>
                {/* row */}
                <div className='flex justify-between items-center'>
                    <div>
                        <h2 className='text-7xl mb-5'>Hello, {user.firstName}</h2>
                        <p className='text-lg'>
                            Lorem, ipsum, <span className='underline'>project-ullr</span>, Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam aut eius quaerat harum nostrum. Aliquid facere excepturi dolorem iusto quasi veritatis alias impedit officia. Molestiae ducimus voluptatibus id distinctio velit?
                        </p>
                    </div>
                    <img src="https://via.placeholder.com/600x300" alt="placeholder" className='border-4 border-neutral-800' />
                </div>
                {/* row */}
                <div>
                    <h3 className='text-5xl mb-10'>Getting Started</h3>
                </div>
                <LeafletMap height={500} />
                <form onSubmit={handleSubmit}>
                    <input type="text" name="userid" id="userid" value={requestid} onChange={e => setRequestid(e.target.value)} />
                    <input type="submit" value="Add Friend" />
                </form>
            </div>
        </>
    )
}