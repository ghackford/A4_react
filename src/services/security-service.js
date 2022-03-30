import axios from "axios";
// const BASE_URL = "https://cs5500-01-sp22.herokuapp.com/api";
// const BASE_URL = "http://localhost:4000/api";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const SECURITY_API = `${BASE_URL}/api/auth`;

const api = axios.create({
    withCredentials: true
});

api.interceptors.request.use(request => {
    console.log('Starting Request')
    console.log(request)
    return request
})

api.interceptors.response.use(response => {
    console.log('Received response')
    console.log(response)
    return response
})

export const register = (user) =>
    api.post(`${SECURITY_API}/register`, user)
        .then(response => response.data);

// export const login = (user) =>
    // api.post(`${SECURITY_API}/login`, user)
    //     .then(response => response.data);

export const login = (user) => {
    console.log("login function");
    console.log(user);
    return api.post(`${SECURITY_API}/login`, user)
        .then(response => {
            console.log("login response from server:");
            console.log(response);
            return response.data;
        });
}

export const logout = (user) =>
    api.post(`${SECURITY_API}/logout`, user)
        .then(response => response.data);

export const profile = () =>
    api.post(`${SECURITY_API}/profile`)
        .then(response => response.data);