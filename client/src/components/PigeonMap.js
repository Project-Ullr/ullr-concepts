import React, { useEffect, useState } from 'react'
import { Map, Marker, GeoJson } from 'pigeon-maps'
import { osm } from 'pigeon-maps/providers'
import axios from 'axios'
import * as gju from 'geojson-utils'

const API_KEY = '1000976ee9867cf34c89115f9cbb8588'



export const PigeonMap = () => {

    const [latLong, setLatLong] = useState([40.044320, -105.906050])
    const [sw, setSW] = useState([])
    const [ne, setNE] = useState([])
    const [resorts, setResorts] = useState([])

    const center = [((ne[0] + sw[0]) / 2), ((sw[1] + ne[1]) / 2)]

    const GEOJSONTEST = {
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                geometry: { type: 'Point', coordinates: center }
            }
        ]
    }

    const handleMapClick = args => {
        const { latLng } = args
        setLatLong(latLng)
    }

    const updateBounds = e => {
        const { ne, sw } = e.bounds
        setSW(sw)
        setNE(ne)
    }

    //init loading of map markers
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/get_all_resorts')
            .then(resorts => setResorts(resorts.data))
            .catch(error => console.error(error))
    }, [])

    return (
        <div className='relative border-4 border-neutral-800 shadow-2xl'>
            <Map
                provider={osm}
                dprs={[1, 2]}
                defaultCenter={[40.044320, -105.906050]}
                height={800}
                width={600}
                defaultZoom={16}
                minZoom={10}
                onClick={handleMapClick}
                onBoundsChanged={updateBounds}>
                {
                    resorts &&
                    resorts.map((item, index) =>
                        gju.pointDistance(
                            { type: 'Point', coordinates: center },
                            { type: 'Point', coordinates: [item.lat, item.lng] }
                        ) < 100000 &&
                        <Marker key={index} width={50} anchor={[item.lat, item.lng]} />
                    )
                }
            </Map>
            <div className='absolute bottom-0 left-0 right-0 bg-neutral-800 p-5 text-neutral-200 font-bold flex justify-between'>
                <div>
                    <h3>Current Target Location</h3>
                    <p>Lat: {latLong[0]}</p>
                    <p>Lon: {latLong[1]}</p>
                </div>
            </div>
        </div>
    )
}