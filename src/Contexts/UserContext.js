import { createContext, useEffect, useId, useState} from "react";
import { addUserData, getAllUsers, getCartById } from "../Api/UserHelpers/UsersConnection";

export const UserContext = createContext();

export const UserProvider=({children})=>{
    const[userData,setUserData]=useState([]);
    const[userInfo,setUserInfo]=useState('');
    const userId=localStorage.getItem('userId')
    const[carts,setCart]=useState(false);
  
    
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
        const user=userData.find((info)=>{
                return(info.username===data.username && info.password===data.password)
            })
        if(user){
            localStorage.setItem('userId', user.id);
            setUserInfo(user.id)
        }
    }

   
    
        // getCartById(userId)
        // .then((res)=>setCart(res))
   
    return(
        <UserContext.Provider value={{activeUser,userInfo,addUser,carts,setCart}}>
            {children}
        </UserContext.Provider>
    )
}