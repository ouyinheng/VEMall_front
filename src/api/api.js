import axios from 'axios';

// export const base = 'http://47.93.220.254:3000';
export const base = 'http://192.168.17.134:3000';

//登陆
export const requestLogin = params => {return axios.post(`${base}/admin/login`,params).then(res => res.data);}
// 验证
export const toVerify = () => {return axios.get(`${base}/gt/register1?t=` + (new Date()).getTime()).then(res => res.data);}
//忘记密码
export const toFindPwd = params => {return axios.post(`${base}/admin/findPwd`,params).then(res => res.data);}
//所有用户
export const requestAllUser = () => {return axios.post(`${base}/admin/findAll`).then(res => res.data);}

//图片
export const requestImages = () => {return axios.get(`${base}/admin/queryImages`).then(res => res.data);}

//所有社团
export const requestAllMass = () => {return axios.post(`${base}/mass/findAll`).then(res=>res.data)}

//添加商品
export const appendCommodity = params =>{return axios.post(`${base}/admin/addCommodity`,params).then(res=>res.data)}
