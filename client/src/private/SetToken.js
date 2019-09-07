import axios from 'axios'

export const setAuthToken = token => {
    if (token) {
        // Apply to every request
        axios.defaults.headers.common['Authorization'] = token;
        console.log("header is " + token)
    } else {
        // Delete auth header
        delete axios.defaults.headers.common['Authorization'];
    }
};