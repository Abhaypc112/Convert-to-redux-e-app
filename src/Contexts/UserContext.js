import { createContext, useEffect, useId, useState} from "react";
import { addUser, getAllUsers, getCartById } from "../Api/UserHelpers/UsersConnection";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const UserContext = createContext();

export const UserProvider=({children})=>{
    const[userData,setUserData]=useState([]);
    const[userInfo,setUserInfo]=useState('');
    const[carts,setCart]=useState(false);
    const[editStatus,setEditStatus]=useState(false);
    const[deleteCartItem,setDeleteCartItem]=useState(false);
  
    // useEffect(()=>{
    //     getAllUsers()
    //     .then((res)=>setUserData(res.data))
    //     .catch(error=>console.log(error))
        
    // },[])

    const addUser=async (user)=>{
        try{
            await addUser(user)
            const updatedUsers = await getAllUsers();
            setUserData(updatedUsers.data)
            .then(()=>toast.success("Account Created"))
        }catch(err){
            console.log(err)
        }
    }
    const activeUser =(data)=>{
        const error={};
        if(data.username==="admin" && data.password==="123456"){
            localStorage.setItem('adminId',data.username);
        }else{
            const user=userData.find((info)=>{
                   if(info.username===data.username && info.password===data.password){
                        if(info.block){
                            error.errors="You Blocked By Admin *"
                        }else{
                            return info
                        }
                   }else if(info.username!==data.username && info.password!==data.password){
                        error.errors="Invalid Username Or Password *"
                   }
            })
            if(user){
                localStorage.setItem('userId', user.id);
                setUserInfo(user.id)
                toast.success("Login Sucessfull")
            }
        }
        return error;                       
    }
    return(
        <UserContext.Provider value={{editStatus,setEditStatus,activeUser,userInfo,addUser,carts,setCart,deleteCartItem,setDeleteCartItem}}>
            {children}
        </UserContext.Provider>
    )
}