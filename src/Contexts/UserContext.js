import { createContext, useEffect, useId, useState} from "react";
import { addUserData, getAllUsers, getCartById } from "../Api/UserHelpers/UsersConnection";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider=({children})=>{
    const[userData,setUserData]=useState([]);
    const[userInfo,setUserInfo]=useState('');
    const[carts,setCart]=useState(false);
    const[editStatus,setEditStatus]=useState(false)
  
    useEffect(()=>{
        getAllUsers()
        .then((res)=>setUserData(res.data))
        .catch(error=>console.log(error))
        
    },[])

    const addUser=async (user)=>{
        try{
            await addUserData(user)
            const updatedUsers = await getAllUsers();
            setUserData(updatedUsers.data)
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
            }
        }
        return error;
    }

    

    return(
        <UserContext.Provider value={{editStatus,setEditStatus,activeUser,userInfo,addUser,carts,setCart}}>
            {children}
        </UserContext.Provider>
    )
}