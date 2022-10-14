import React, { useEffect, useState } from 'react'
import GoogleMapReact, { convertNeSwToNwSe } from 'google-map-react'
import { Marker } from '../depricated/Marker'
import axios from 'axios'

export const GoogleMap = () => {

    const [resorts, setResorts] = useState([])
    const [bounds, setBounds] = useState([])

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/get_all_resorts')
            .then(response => setResorts(response.data))
            .catch(error => console.log(error))
    }, [])

    const onAPI = (map, maps) => {
        const bounds = map.getBounds()
        const ne = bounds.getNorthEast()
        const sw = bounds.getSouthWest()
        const { nw, se } = convertNeSwToNwSe({ ne, sw })

        const coords = [
            { lat: ne.lat(), lng: ne.lng() },
            { lat: se.lat(), lng: se.lng() },
            { lat: sw.lat(), lng: sw.lng() },
            { lat: nw.lat(), lng: nw.lng() }
        ]

        let rect = new maps.Polygon({
            paths: coords
        })

        console.log(maps.geometry.poly.containsLocation({ lat: 40.044320, lng: -105.906050 }, rect))
    }

    return (
        <div className='w-[600px] h-[800px] border-4 border-neutral-800'>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyA0Dykicdn65lVpB0aqis4p6XXgaoRZ3KA' }}
                defaultCenter={[40.044320, -105.906050]}
                defaultZoom={15}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) => onAPI(map, maps)}
            >
            </GoogleMapReact>
        </div>
    )
}