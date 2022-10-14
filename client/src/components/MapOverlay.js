import React from 'react'

export const MapOverlay = props => {
    return (
        <div className='absolute
        bottom-0
        left-0
        right-0
        h-[150px]
        bg-neutral-800
        backdrop-blur-sm
        bg-opacity-80 z-[1000]
        border-t-4
        border-neutral-800
        text-neutral-200
        text-xl
        font-mono
        font-bold
        flex
        items-start
        justify-between
        py-2
        px-3'>
            {props.children}
        </div>
    )
}