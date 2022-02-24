import createDataContext from "./createDataContext";
import trackerApi from '../api/tracker'

const trackReducer = (state, action) => {
    switch (action.type) {
        case 'fetch_tracks':
            return action.payload;  // payload = all tracks details, which is also our state
        default:
            return state;
    }
}

const fetchTracks = (dispatch) => {
    return async() => {
        const response = await trackerApi.get('/tracks');

        dispatch({ type: 'fetch_tracks', payload: response.data }) // in data we get stored every track record
    }
}

const createTrack = (dispatch) => {
    return async (name, locations) => {
        await trackerApi.post('/tracks', { name, locations });
    }
}

export const { Context, Provider } = createDataContext(
    trackReducer,
    { fetchTracks, createTrack },
    []
)