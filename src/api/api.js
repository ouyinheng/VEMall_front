import axios from 'axios';

let base = 'http://192.168.17.131:3000';

export const requestLogin = params => {return axios.post(`${base}/subject/login`,params).then(res => res.data);}

export const requestAllUser = () => {return axios.post(`${base}/subject/findAll`).then(res => res.data);}

export const requestImages = () => {return axios.get(`${base}/subject/queryImages`).then(res => res.data);}

export const requestAllMass = () => {return axios.post(`${base}/mass/findAll`).then(res=>res.data)}