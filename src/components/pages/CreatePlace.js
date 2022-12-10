import React, { useState, useEffect, useRef } from 'react';

import { api } from '../../api/axios';
import { useAuth0 } from '@auth0/auth0-react';
import { formattedTimeToMinutes } from '../../utils/time';

// Rough component for adding places, not being used in deployed application
function CreatePlaceCard(props) {
    const { getAccessTokenSilently } = useAuth0();

    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');

    const [cityName, setCityName] = useState('');
    const [streetName, setStreetName] = useState('');
    const [streetNumber, setStreetNumber] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const [sunStart, setSunStart] = useState('');
    const [sunEnd, setSunEnd] = useState('');
    const [monStart, setMonStart] = useState('');
    const [monEnd, setMonEnd] = useState('');
    const [tueStart, setTueStart] = useState('');
    const [tueEnd, setTueEnd] = useState('');
    const [wedStart, setWedStart] = useState('');
    const [wedEnd, setWedEnd] = useState('');
    const [thurStart, setThurStart] = useState('');
    const [thurEnd, setThurEnd] = useState('');
    const [friStart, setFriStart] = useState('');
    const [friEnd, setFriEnd] = useState('');
    const [satStart, setSatStart] = useState('');
    const [satEnd, setSatEnd] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const token = await getAccessTokenSilently();
            const response = await api.post(
                `/explore/places/create`,
                JSON.stringify({
                    name: name,
                    category: category,
                    description: description.trim(),
                    address: {
                        countryCode: 'CA',
                        province: 'ON',
                        city: cityName,
                        streetName: streetName,
                        streetNumber: streetNumber,
                        postalCode: postalCode,
                        unit: null,
                    },
                    phone: phoneNumber,
                    attributes: [],
                    hours: {
                        sun: [
                            {
                                start: formattedTimeToMinutes(sunStart),
                                end: formattedTimeToMinutes(sunEnd),
                            },
                        ],
                        mon: [
                            {
                                start: formattedTimeToMinutes(monStart),
                                end: formattedTimeToMinutes(monEnd),
                            },
                        ],
                        tue: [
                            {
                                start: formattedTimeToMinutes(tueStart),
                                end: formattedTimeToMinutes(tueEnd),
                            },
                        ],
                        wed: [
                            {
                                start: formattedTimeToMinutes(wedStart),
                                end: formattedTimeToMinutes(wedEnd),
                            },
                        ],
                        thu: [
                            {
                                start: formattedTimeToMinutes(thurStart),
                                end: formattedTimeToMinutes(thurEnd),
                            },
                        ],
                        fri: [
                            {
                                start: formattedTimeToMinutes(friStart),
                                end: formattedTimeToMinutes(friEnd),
                            },
                        ],
                        sat: [
                            {
                                start: formattedTimeToMinutes(satStart),
                                end: formattedTimeToMinutes(satEnd),
                            },
                        ],
                    },
                    review: [],
                }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                }
            );
            setName('');
            setCategory('');
            setCityName('');
            setDescription('');
            setStreetName('');
            setStreetNumber('');
            setPostalCode('');
            setPhoneNumber('');
            setSunStart('');
            setSunEnd('');
            setMonStart('');
            setMonEnd('');
            setTueStart('');
            setTueEnd('');
            setWedStart('');
            setWedEnd('');
            setThurStart('');
            setThurEnd('');
            setFriStart('');
            setFriEnd('');
            setSatStart('');
            setSatEnd('');
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="h-screen w-full flex items-center flex-col">
            <div className="mt-8 h-auto w-auto max-w-1/2 flex flex-col m-2 p-2 items-center bg-primary-green rounded-2xl shadow-md text-black">
                <h1 className="text-xl pb-1">Create PlaceCard</h1>
                <form
                    className="flex flex-col items-center"
                    onSubmit={handleSubmit}
                >
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                    <label htmlFor="category">Category:</label>
                    <input
                        type="text"
                        id="category"
                        onChange={(e) => setCategory(e.target.value)}
                        value={category}
                    />
                    <label htmlFor="description">Description:</label>
                    <textarea
                        type="text"
                        id="description"
                        className="text-black mb-1 h-36 w-64 break-words p-1"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                    />
                    <label htmlFor="city">City:</label>
                    <input
                        type="text"
                        id="name"
                        onChange={(e) => setCityName(e.target.value)}
                        value={cityName}
                    />
                    <label htmlFor="streetName">Street Name:</label>
                    <input
                        type="text"
                        id="name"
                        onChange={(e) => setStreetName(e.target.value)}
                        value={streetName}
                    />
                    <label htmlFor="streetNumber">Street Number:</label>
                    <input
                        type="text"
                        id="streetNumber"
                        onChange={(e) => setStreetNumber(e.target.value)}
                        value={streetNumber}
                    />
                    <label htmlFor="postalCode">Postal Code:</label>
                    <input
                        type="text"
                        id="postalCode"
                        onChange={(e) => setPostalCode(e.target.value)}
                        value={postalCode}
                    />
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input
                        type="text"
                        id="phoneNumber"
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        value={phoneNumber}
                    />
                    <label htmlFor="sunStart">Sunday Start:</label>
                    <input
                        type="text"
                        id="sunStart"
                        onChange={(e) => setSunStart(e.target.value)}
                        value={sunStart}
                    />
                    <label htmlFor="sunEnd">Sunday End:</label>
                    <input
                        type="text"
                        id="sunEnd"
                        onChange={(e) => setSunEnd(e.target.value)}
                        value={sunEnd}
                    />
                    <label htmlFor="monStart">Monday Start:</label>
                    <input
                        type="text"
                        id="monStart"
                        onChange={(e) => setMonStart(e.target.value)}
                        value={monStart}
                    />
                    <label htmlFor="monEnd">Monday End:</label>
                    <input
                        type="text"
                        id="monEnd"
                        onChange={(e) => setMonEnd(e.target.value)}
                        value={monEnd}
                    />
                    <label htmlFor="tueStart">Tuesday Start:</label>
                    <input
                        type="text"
                        id="tueStart"
                        onChange={(e) => setTueStart(e.target.value)}
                        value={tueStart}
                    />
                    <label htmlFor="tueEnd">Tuesday End:</label>
                    <input
                        type="text"
                        id="tueEnd"
                        onChange={(e) => setTueEnd(e.target.value)}
                        value={tueEnd}
                    />
                    <label htmlFor="wedStart">Wednesday Start:</label>
                    <input
                        type="text"
                        id="wedStart"
                        onChange={(e) => setWedStart(e.target.value)}
                        value={wedStart}
                    />
                    <label htmlFor="wedEnd">Wednesday End:</label>
                    <input
                        type="text"
                        id="wedEnd"
                        onChange={(e) => setWedEnd(e.target.value)}
                        value={wedEnd}
                    />
                    <label htmlFor="thurStart">Thursday Start:</label>
                    <input
                        type="text"
                        id="thurStart"
                        onChange={(e) => setThurStart(e.target.value)}
                        value={thurStart}
                    />
                    <label htmlFor="thurEnd">Thursday End:</label>
                    <input
                        type="text"
                        id="thurEnd"
                        onChange={(e) => setThurEnd(e.target.value)}
                        value={thurEnd}
                    />
                    <label htmlFor="friStart">Friday Start:</label>
                    <input
                        type="text"
                        id="friStart"
                        onChange={(e) => setFriStart(e.target.value)}
                        value={friStart}
                    />
                    <label htmlFor="friEnd">Friday End:</label>
                    <input
                        type="text"
                        id="friEnd"
                        onChange={(e) => setFriEnd(e.target.value)}
                        value={friEnd}
                    />
                    <label htmlFor="satStart">Saturday Start:</label>
                    <input
                        type="text"
                        id="satStart"
                        onChange={(e) => setSatStart(e.target.value)}
                        value={satStart}
                    />
                    <label htmlFor="satEnd">Saturday End:</label>
                    <input
                        type="text"
                        id="satEnd"
                        onChange={(e) => setSatEnd(e.target.value)}
                        value={satEnd}
                    />

                    <button
                        type="submit"
                        className="bg-white disabled:opacity-50 justify-self-center rounded-md w-1/3 mt-3 p-1 text-primary-green font-semibold"
                    >
                        Create Place
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreatePlaceCard;
