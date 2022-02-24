import { AsyncStorage } from "react-native";
// import AsyncStorage from '@react-native-async-community/async-storage'
import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
    switch (action.type) {
        case 'add_error':
            return { ...state, errorMessage: action.payload };
        
        case 'signup':case 'signin':case 'autLogin':
            return { errorMessage: '', token: action.payload };  
        // here we not using {...state,} because, if we first give wrong email and password and then give right and signup
        // the errorMessage state is still same when we logout and signup page we see that errorMessage
        // so we update errorMessage state to ''

        case 'singout':
            return { token: null, errorMessage: '' }
            
        case 'clear_error_message':
            return { ...state, errorMessage: '' };

        default:
            return state;
    }
};

const tryLocalSignin = (dispatch) => {
    return async () => {
        const token = await AsyncStorage.getItem('token');

        if(token) {
            dispatch({ type: 'signup', payload: token });
            navigate('TrackList');
        }else{
            navigate('loginFlow')
        }
    } 
}
const clearErrorMessage = (dispatch) => () => {
    dispatch({ type: 'clear_error_message' });
}

const signup = (dispatch) => {
        // make api request to sign up with that email and password
        // if we sign up, modify out state, and say that we are signed-in(authenticated)
        // if signing up fails, we probably need to reflect an error message
    return async ({ email, password }) => {
        try{
            const response = await trackerApi.post('/signup', { email, password });
            // console.log(response.data);   // get token after signup
            await AsyncStorage.setItem('token', response.data.token);
            dispatch({ type: 'signup', payload: response.data.token});

            navigate('TrackList');
        }catch(error) {
            dispatch({
                type: 'add_error',
                payload: `${error}`
            })
        }
    };
};

// when we switch between SignupScreen and SigninScreen, if errorMessage appears on on screen,
// then it will also still appears on other when switch


const signin = (dispatch) => {
    // try to singin
    // handle success by updating state
    // handle failure by showing error message(somehow)
    return async ({ email, password }) => {
        try{
            const response = await trackerApi.post('/signin', { email, password });
            // console.log(response.data);   // get token after signup
            await AsyncStorage.setItem('token', response.data.token);
            dispatch({ type: 'signin', payload: response.data.token});

            navigate('TrackList');
        }catch(error) {
            dispatch({
                type: 'add_error',
                payload: `${error}`
            })
        }
    };
};

const signout = (dispatch) => {
    return async () => {
        await AsyncStorage.removeItem('token');
        dispatch({ type: 'signout'});

        navigate('loginFlow')
    }
}

export const { Context, Provider } = createDataContext(
    authReducer,
    { signup, signin, signout, clearErrorMessage, tryLocalSignin },
    { token: null, errorMessage: '' }
);