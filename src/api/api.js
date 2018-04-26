import axios from 'axios';

// export const base = 'http://47.93.220.254:3000';
export const base = 'http://192.168.17.137:3000';

//登陆
export const requestLogin = params => {return axios.post(`${base}/admin/login`,params).then(res => res.data);}
// 图形验证
export const toVerify = () => {return axios.get(`${base}/gt/register1?t=` + (new Date()).getTime()).then(res => res.data);}
// 邮箱验证
export const toVerifyMailNum = params => {return axios.post(`${base}/admin/verify`,params).then(res => res.data);}
// 注册
export const toReg = params => {return axios.post(`${base}/admin/reg`,params).then(res => res.data);}
//添加收货地址
export const addUserInfo = params => {return axios.post(`${base}/admin/addUserInfo`,params).then(res => res.data);}
//获取收货地址
export const getUserInfo = params => {return axios.post(`${base}/admin/getUserInfo`,params).then(res => res.data);}
export const getUserSite = params => {return axios.post(`${base}/admin/getUserSite`,params).then(res => res.data);}
//修改默认收货地址
export const editUserInfo = params => {return axios.post(`${base}/admin/editUserInfo`,params).then(res => res.data);}
//添加订单
export const addUserOrder = params => {return axios.post(`${base}/admin/addUserOrder`,params).then(res => res.data);}
//查询订单
export const queryUserOrder = params => {return axios.post(`${base}/admin/queryUserOrder`,params).then(res => res.data);}
//查询商品
export const queryComm = params => {return axios.post(`${base}/admin/queryComm`,params).then(res => res.data);}
//忘记密码
export const toFindPwd = params => {return axios.post(`${base}/admin/findPwd`,params).then(res => res.data);}
//所有用户
export const requestAllUser = () => {return axios.post(`${base}/admin/findAll`).then(res => res.data);}
//对用户的操作
export const editUser = params => {return axios.post(`${base}/admin/editUser`,params).then(res => res.data)}
export const delUser = params => {return axios.post(`${base}/admin/delUser`,params).then(res => res.data)}
export const editUserIcon = params => {return axios.post(`${base}/admin/editUserIcon`,params).then(res => res.data)}
//图片
export const requestImages = () => {return axios.get(`${base}/admin/queryImages`).then(res => res.data);}

//所有社团
export const requestAllMass = () => {return axios.post(`${base}/mass/findAll`).then(res=>res.data)}

//添加商品
export const appendCommodity = params =>{return axios.post(`${base}/admin/addCommodity`,params).then(res=>res.data)}

//查询商品
export const queryCommodity = params => {return axios.post(`${base}/admin/queryCommodity`,params).then(res=>res.data)}
//获取文件加下的文件名目录
export const requestFileName = params =>{return axios.post(`${base}/admin/getFiles`,params).then(res=>res.data)}
