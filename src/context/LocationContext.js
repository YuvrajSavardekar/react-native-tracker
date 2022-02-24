import createDataContext from "./createDataContext";

const locationReducer = (state, action) => {
    switch (action.type) {
        case 'add_current_location':
            return { ...state, currentLocation: action.payload };


        case 'add_location':
            return { ...state, locations: [ ...state.locations, action.payload]};
            // storing current locations is array to draw line map

        case 'start_recording':
            return { ...state, recording: true };

        case 'stop_recording':
            return { ...state, recording: false };

        case 'change_name':
            return { ...state, name: action.payload };
            
        case 'reset':
            return { ...state, name: '', locations: [] };

        default:
            return state;
    }
};

const startRecording = (dispatch) => {
    return () => {
        dispatch({ type: 'start_recording'});
    }
};

const stopRecording = (dispatch) => {
    return () => {
        dispatch({ type: 'stop_recording'});
    }
};

const addLocation = (dispatch) => {
    return (location, recording) => {
        dispatch({ type: 'add_current_location', payload: location});   // update current location

        // console.log(recording);
        if(recording) {
            dispatch({ type: 'add_location', payload: location});
            // add current locations in locations[array] which draw a line on map
        }
    }
};

const changeName = (dispatch) => {
    return (name) => {
        dispatch({ type: 'change_name', payload: name })
    }
}

const reset = (dispatch) => {  // this function is required to reset name and locations[array] when save recording
    return () => {
        dispatch({ type: 'reset'});
    }
}

export const { Context, Provider } = createDataContext(
    locationReducer,
    { startRecording, stopRecording, addLocation, changeName, reset },
    { recording: false, locations: [], currentLocation: null, name: '' }
) 

