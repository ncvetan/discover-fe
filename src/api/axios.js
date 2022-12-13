import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://discover-be-west.onrender.com',
});

export async function getPlaces(category, pageParam = 1, options = {}) {
    const response = await axios.get(
        `/explore/places/${category}/${pageParam}`,
        options
    );
    return response.data;
}

export async function getReviews(placeId, pageParam = 1, options = {}) {
    const response = await axios.get(
        `/explore/places/${placeId}/reviews/${pageParam}`,
        options
    );
    return response.data;
}
