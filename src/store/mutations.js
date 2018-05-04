export const toLogin = (state,data) => {
    state.bool = data.bool;
    state.user = {
        username:data.username,
        password:data.password,
        limit:data.limit,
        status:data.status,
        icon_url:data.icon_url
    }
}
export const toAdminLogin = (state,data) => {
    state.bool = data.bool;
    state.user = {
        username:data.username,
        password:data.password,
        limit:data.limit,
        status:data.status,
        icon_url:data.icon_url
    }
}
export const toLogout = (state,data) => { state.bool = data.bool;state.disabled = true; };//登出
export const isLogin = (state,data) => { state.disabled = false; };//验证码
export const getAllUser = (state,data) => { state.userList = data; };//得到所有用户
export const getAllMass = (state,data) => { state.massList = data; };//得到所有社团