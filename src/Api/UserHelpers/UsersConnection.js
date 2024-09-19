import axios from 'axios'


const USERS_LIST="http://localhost:5000/users";

export function getAllUsers(){
    return axios.get(USERS_LIST)
}

export function addUserData(data){
    return axios.post(USERS_LIST,data)
}

export function getUserById(id){
    
    return axios.get(`${USERS_LIST}/${id}`);
}

export async function getCartById(id){
    const res= await axios.get(`${USERS_LIST}/${id}`);
    return res.data.cart
}

export function addCart(id,updatecart){
    return axios.patch(`${USERS_LIST}/${id}`,updatecart);
}

export function deleteItem(id,deleteData){
    return axios.patch(`${USERS_LIST}/${id}`,deleteData)
}

export function addAddress(id,updateAddress){
    return axios.patch(`${USERS_LIST}/${id}`,updateAddress)
}
export async function getAddressById(id){
    const res= await axios.get(`${USERS_LIST}/${id}`);
    return res.data.address
}

export function addOrder(id,updateOrder){
    return axios.patch(`${USERS_LIST}/${id}`,updateOrder)
}
export async function getOrdersById(id){
    const res= await axios.get(`${USERS_LIST}/${id}`);
    return res.data.orders
}
export async function checkUserName(username){
    const res = await axios.get(`${USERS_LIST}?username=${username}`)
    return (res.data.length>0);
    
}
// export async function incrementCount(userId,productId){
//     return
// }

export function deleteUserById(id){
    return axios.delete(`${USERS_LIST}/${id}`)
}

export function blockUserById(id,status){
   
    return axios.patch(`${USERS_LIST}/${id}`,{block:status})
}