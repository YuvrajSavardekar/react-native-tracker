import axios from "axios";
import { AsyncStorage } from "react-native";

const instance = axios.create({
    baseURL: 'http://ef37-103-173-50-72.ngrok.io'
    // ngrok creates a tunnel which provides public url to access page
    // it valid only for 2 hours so change it whenver you run
});

// when we 'post' request to express API to save 'tracks' first we need to authenticate our selfs
// to authenticate we have to pass 'JW-Token'(which we get when log in) in header{ Authorization: token}
// so by below method we pass that 'token' when we make request, so we don't need extra code

instance.interceptors.request.use(
    async (config) => {     // 1st function
        const token = await AsyncStorage.getItem('token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },

    (error) => {           // 2nd function for error
        return Promise.reject(error);
    }
)

export default instance;