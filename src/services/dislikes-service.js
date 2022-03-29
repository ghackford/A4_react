import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const USERS_API = `${BASE_URL}/api/users`;
const TUITS_API = `${BASE_URL}/api/tuits`;

const api = axios.create({
  withCredentials: true
});

export const findAllTuitsDislikedByUser = (userId) =>
    api.get(`${USERS_API}/${userId}/dislikes`)
        .then(response => response.data);

export const findAllUsersThatDislikedTuit = (tid) =>
    api.get(`${TUITS_API}/${tid}/dislikes`)
        .then(response => response.data);

export const userDislikesTuit = (uid, tid) =>
    api.put(`${USERS_API}/${uid}/dislikes/${tid}`)
        .then(response => response.data);

export const countDislikes = (tid) =>
    api.get(`${TUITS_API}/${tid}/dislikes/count`)
        .then(response => response.data);

export const deleteDislike = (did) =>
    api.delete(`${TUITS_API}/dislikes/${did}/delete`)
        .then(response => response.data);

export const findDislikeById = (did) =>
    api.get(`${BASE_URL}/api/dislikes/${did}`)
        .then(response => response.data);