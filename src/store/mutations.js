export const toLogin = (state,data) => {
    state.bool = data.bool;
    state.user = {
        username:data.data.username,
        password:data.data.password,
        limit:data.data.limit,
        status:data.data.status,
        icon_url:data.data.icon_url
    }
}
export const toLogout = (state,data) => { state.bool = data.bool; };//登出
export const getAllUser = (state,data) => { state.userList = data; };//得到所有用户
export const getAllMass = (state,data) => { state.massList = data; };//得到所有社团