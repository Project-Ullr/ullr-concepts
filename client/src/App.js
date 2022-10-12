import React from 'react'
import { PigeonMap } from './components/PigeonMap'

export const App = () => {
    return (
        <div className='flex justify-center items-center bg-neutral-200 absolute left-0 right-0 top-0 bottom-0'>
            <PigeonMap />
        </div>
    )
}