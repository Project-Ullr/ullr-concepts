import React, { useState } from 'react'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import { CustomMarkers } from './CustomMarkers'
import { MapOverlay } from './MapOverlay'
import 'leaflet/dist/leaflet.css'

export const LeafletMap = props => {
    const [target, setTarget] = useState(
        {
            "_id": 516,
            "name": "Ski Granby Ranch",
            "lat": 40.044568999107,
            "lng": -105.90567111969,
            "website": "http://www.granbyranch.com/",
            "__v": 0
        })

    const { height } = props

    return (
        <div className='border-4 border-neutral-800'>
            <MapContainer
                center={[target.lat, target.lng]}
                zoom={15}
                maxZoom={20}
                zoomSnap={0.1}
                style={{ height: height }}
                zoomControl={false}
                scrollWheelZoom={true}
                whenReady={map => {
                    setTimeout(() => {
                        map.target.setView([target.lat, target.lng])
                    }, 200)
                }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
                {/* Markers below here. */}
                <CustomMarkers setTarget={setTarget} />
            </MapContainer>
        </div>
    )
}