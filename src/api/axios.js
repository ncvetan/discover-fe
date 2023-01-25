import axios from 'axios';

export const api = axios.create();

export async function getPlaces(category, pageParam = 1, options = {}) {
    const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/explore/places/${category}/${pageParam}`,
        options
    );
    return response.data;
}

export async function getPlaceDetails(placeId) {
    const response = await api.get(
        `${process.env.REACT_APP_SERVER_URL}/explore/places/${placeId}`,
        {
            headers: { 'Content-Type': 'application/json' },
        }
    );
    return response.data;
}

export async function getReviews(placeId, pageParam = 1, options = {}) {
    const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/explore/places/${placeId}/reviews/${pageParam}`,
        options
    );
    return response.data;
}
