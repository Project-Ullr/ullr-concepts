import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import { CustomMarkers } from './CustomMarkers'
import { MapOverlay } from './MapOverlay'
import 'leaflet/dist/leaflet.css'

export const LeafletMap = () => {
    const [target, setTarget] = useState(
        {
            "_id": 516,
            "name": "Ski Granby Ranch",
            "lat": 40.044568999107,
            "lng": -105.90567111969,
            "website": "http://www.granbyranch.com/",
            "__v": 0
        })

    return (
        <div className='relative border-4 border-neutral-800'>
            <MapContainer
                center={[target.lat, target.lng]}
                zoom={13}
                className='w-[600px] h-[800px]'
                zoomControl={false}
                scrollWheelZoom={true}
                zoomSnap={0}
                whenReady={map => {
                    setTimeout(() => {
                        map.target.setView([target.lat, target.lng])
                    }, 200)
                }}
            >
                <TileLayer
                    attribution='&copy; Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
                    url="https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg"
                />
                {/* Markers below here. */}
                <CustomMarkers setTarget={setTarget} />
            </MapContainer>
            {/* Overlay stuff */}
            <MapOverlay>
                <div className='h-full flex flex-col justify-between'>
                    <h3>Current Selection</h3>
                    <div>
                        <p className='text-sm'>{target.name}</p>
                        <p className='text-sm'><a href={target.website} target="_blank" rel='noreferrer'>{target.website}</a></p>
                    </div>
                </div>
                <div>
                    <h3>Weather</h3>
                </div>
            </MapOverlay>
        </div>
    )
}