import { getAllUsers } from "../Api/UserHelpers/UsersConnection";
import { loginFailure, loginStart, loginSuccess, logout } from "../Slices/Authentication/loginslice";

const checkLogin = async (data) => {
    
    
    const res = await getAllUsers();
    
    return new Promise((resolve, reject) => {
           
              let user = (res.data).find((user) => {
                    if (user.username === data.username && user.password === data.password) {
                        return({ id:user.id, username:user.username });
                    } 
                })
                if(user){
                    resolve(user)
                }else{
                    reject('Invalid username or password');
                }
        
    });
};

export const login = (loginInfo) => async (dispatch) => {
    try {
        dispatch(loginStart());
        const user = await checkLogin(loginInfo);
        if(user.block){
            dispatch(loginFailure("You account is blocked !"))
        }else{
            dispatch(loginSuccess(user));
            localStorage.setItem("userId",user.id)
        }
    } catch (error) {
        dispatch(loginFailure(error));
    }
};

export const logoutUser = () => (dispatch) => {
    dispatch(logout());
};
