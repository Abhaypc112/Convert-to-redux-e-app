import { createContext} from "react";
import { addUserData, getAllUsers } from "../Api/UserHelpers/UsersConnection";

const UserContext = createContext();

export const UserProvider=({children})=>{
    const data=(data)=>{
        getAllUsers()
        .then((res)=>res.data)
    }
    const addUser=(user)=>{
        addUserData(user)
    }
    return(
        <UserContext.Provider value={{data,addUser}}>
            {children}
        </UserContext.Provider>
    )
}