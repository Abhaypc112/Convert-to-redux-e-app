import axios from 'axios'

const token = localStorage.getItem('token');
const authorization = {headers: { 'authorization':token }};


// Api connection
export function getAllUsers(){
    const res = axios.get('http://localhost:3001/api/admin/totalusers',authorization);
    return res
}
export async function checkUser(userInfo){
    const res = await axios.post('http://localhost:3001/api/user/login',userInfo);
    return res.data
}
export async function checkUserName(userData){
    const res = await axios.post(`http://localhost:3001/api/user/signup`,userData);
    return res.data;
}
export async function addUser(userData){
    return await axios.post(`http://localhost:3001/api/user/signup`,userData);
}
export function getUserById(){
   return axios.get('http://localhost:3001/api/user',authorization);
}
export function getCartById(){
   return axios.get('http://localhost:3001/api/users/cart',authorization);
}
export function adjustCount(productId,adjust){
   return axios.patch(`http://localhost:3001/api/users/cart/${productId}/${adjust}`,adjust,authorization);
}
export function addCart(_id,quantity){
    return axios.post(`http://localhost:3001/api/users/cart/${_id}`,quantity,authorization);
}
export function deleteItem(_id){
    return axios.delete(`http://localhost:3001/api/users/cart/${_id}`,authorization);
}
export function addAddress(updateAddress){
    return axios.post(`http://localhost:3001/api/users/address`,updateAddress,authorization)
}
export async function getAddressById(){
    const res= await axios.get('http://localhost:3001/api/users/address',authorization);
    return res.data;
}
export function addOrder(updateOrder){
    return axios.post(`http://localhost:3001/api/users/order`,updateOrder,authorization)
}
export async function getOrdersById(){
    return await axios.get(`http://localhost:3001/api/users/order`,authorization);
}
export function blockUserById(id,status){
    return axios.patch(`http://localhost:3001/api/admin/${id}/${status}`,{},authorization)
}