import Vue from 'vue'
import axios from 'axios'
import {requestLogin,requestAllUser,requestAllMass,toVerify,requestAdminLogin} from '../api/api'

//登录
export const toLogin = (context,data) => {
    return new Promise((resolve,reject)=>{
        requestLogin(data).then(data=>{
            context.commit('toLogin',data);
            resolve('请求成功');
        }).catch(error=>{
            reject(error);
            // console.log(error);
        })
    })
};

//登录
export const toAdminLogin = (context,data) => {
    return new Promise((resolve,reject)=>{
        requestAdminLogin(data).then(data=>{
            context.commit('toAdminLogin',data);
            if(data){
                resolve('请求成功');
            } else {
                resolve(data);
            }
        }).catch(error=>{
            reject(error);
        })
    })
};
//验证码
export const isLogin = (context)=> {context.commit('isLogin')};
// 登出
export const toLogout = (context )=> {context.commit('toLogout',{bool:false})};
//查找所有用户
export const getAllUser = (context) => {
    return new Promise((resolve,reject)=>{
        requestAllUser().then(data=>{
            data.forEach((item,index) => {
                data[index].status = item.status == 1?true:false;
            })
            context.commit('getAllUser',data);
            resolve('获得所有用户')
        }).catch(error=>{
            reject(error)
        })
    })
}

export const getAllMass = (context) => {
    return new Promise((resolve,reject)=>{
        requestAllMass().then(data=>{
            context.commit('getAllMass',data);
            resolve('获得所有社团')
        }).catch(error=>{
            reject(error)
        })
    })
}
