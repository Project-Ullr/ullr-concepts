import React from 'react'

export const ResortOverlay = props => {
    return (
        <div className='bg-neutral-100 p-5 border-2 rounded-lg border-black'>
            <h3>{props.name}</h3>
        </div>
    )
}