import React, { useEffect, useState } from 'react'
import { Marker, useMap, Popup } from 'react-leaflet'
import axios from 'axios'

import L from 'leaflet'

const DivIcon = L.divIcon({
    className: '',
    iconSize: 30,
    html: '<div class="resortIcon"></div>'
})

export const CustomMarkers = props => {
    const [allResorts, setAllResorts] = useState([])
    const [visibleResorts, setVisibleResorts] = useState([])

    const map = useMap()

    const { setTarget } = props


    //get all the resorts
    useEffect(() => {
        axios.get('http://localhost:8000/api/get_all_resorts')
            .then(results => setAllResorts(results.data))
            .catch(error => console.error(error))
    }, [])

    //update on screen markers
    const updateMarkers = () => {
        const bounds = map.getBounds()
        const inBounds = []
        allResorts.map((resort) => {
            if (resort.lat && resort.lng && bounds.contains([resort.lat, resort.lng])) {
                inBounds.push(resort)
            }
        })
        setVisibleResorts(inBounds)
    }

    // on move, update markers
    map.on('moveend', () => updateMarkers())

    return (
        <>
            {
                visibleResorts.map((resort, index) =>
                    <Marker
                        key={index}
                        icon={DivIcon}
                        options={{
                            identify: false
                        }}
                        position={[resort.lat, resort.lng]}
                        eventHandlers={{
                            click: e => {
                                setTarget(resort)
                                map.flyTo([resort.lat, resort.lng], 18, { duration: 0.5 })
                            },
                            mouseover: e => {
                                e.target.openPopup()
                            },
                            mouseout: e => {
                                e.target.closePopup()
                            }
                        }}
                    >
                        {/* Popups here. */}

                        <Popup closeButton={false} className='mapPopup'>{resort.name}</Popup>

                    </Marker>
                )
            }
        </>
    )
}