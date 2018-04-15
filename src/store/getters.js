export const changeGender = (state)=>{
    console.log(state);
    state.userList.forEach((item,index)=>{
        console.log(item);
        // return state.userList[index].gender = (item.gender == '0' ? '女' :'男');
    })
}