import { createContext, useState } from "react";

export const AdminContext = createContext();

export function AdminProvider({child}){
    const [totalOrders,setTotalOrders]=useState("");

    return(
        <AdminContext.Provider value={{totalOrders,setTotalOrders}}>
            {child}
        </AdminContext.Provider>
    )
}