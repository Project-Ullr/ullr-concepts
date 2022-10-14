import React, { useEffect, useState } from 'react'
import { Map, Marker, GeoJson } from 'pigeon-maps'
import { osm } from 'pigeon-maps/providers'
import axios from 'axios'
import * as gju from 'geojson-utils'

const API_KEY = '1000976ee9867cf34c89115f9cbb8588'



export const PigeonMap = () => {

    const [sw, setSW] = useState([])
    const [ne, setNE] = useState([])
    const [resorts, setResorts] = useState([])
    const [target, setTarget] = useState({})
    const [targetWeather, setTargetWeather] = useState({})

    const center = [((ne[0] + sw[0]) / 2), ((sw[1] + ne[1]) / 2)]

    const updateBounds = e => {
        const { ne, sw } = e.bounds
        console.log(e)
        setSW(sw)
        setNE(ne)
    }

    //init loading of map markers
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/get_all_resorts')
            .then(resorts => setResorts(resorts.data))
            .catch(error => console.error(error))
    }, [])

    // Weather for target.
    useEffect(() => {
        if (Object.keys(target).length !== 0) {
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${target.lat}&lon=${target.lng}&appid=${API_KEY}`)
                .then(weather => {
                    console.log(weather.data)
                    setTargetWeather(weather.data)
                })
        }
    }, [target])

    return (
        <div className='relative border-4 border-neutral-800 shadow-2xl'>
            <Map
                provider={osm}
                dprs={[1, 2]}
                defaultCenter={[40.044320, -105.906050]}
                height={800}
                width={600}
                defaultZoom={16}
                onBoundsChanged={updateBounds}
                onClick={rep => console.log(rep)}
            >
                {
                    resorts &&
                    resorts.map((item, index) =>
                        gju.pointDistance(
                            { type: 'Point', coordinates: center },
                            { type: 'Point', coordinates: [item.lat, item.lng] }
                        ) < 100000 &&
                        <Marker color="#ab75e0" key={index} width={50} anchor={[item.lat, item.lng]} onClick={e => setTarget(item)} />
                    )
                }
            </Map>
            <div className='absolute bottom-0 left-0 right-0 bg-neutral-800 p-5 text-neutral-200 font-bold flex justify-between'>
                <div>
                    <h3 className='border-b-2 mb-2'>Current Target Location</h3>
                    <p>{target.name}</p>
                    <a href={target.website} target="_blank">{target.website}</a>
                </div>
                <div>
                    <h3 className='border-b-2 mb-2'>Weather</h3>
                    {
                        Object.keys(targetWeather).length > 0 &&
                        <div>
                            <p>{convertToF(targetWeather.main.temp)}°F</p>
                            <p>{targetWeather.weather[0].main}</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

const convertToF = temp => {
    return (Math.round((temp - 273.15) * (9 / 5) + 32) * 10) / 10
}