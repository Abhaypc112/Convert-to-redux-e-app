import axiosInstance from '../axiosInstance';

// Api connection
export function getAllUsers(){
    return axiosInstance.get('/admin/total-users');  
}
export async function checkUser(userInfo){
    const res = await axiosInstance.post('/user/login',userInfo);
    return res.data
}
export async function checkUserName(userData){
    const res = await axiosInstance.post(`/user/signup`,userData);
    return res.data;
}
export async function addUser(userData){
    return await axiosInstance.post(`/user/signup`,userData);
}
export function getUserById(){
   return axiosInstance.get('/user');
}
export function getCartById(){
   return axiosInstance.get('/users/cart');
}
export function adjustCount(productId,adjust){
   return axiosInstance.patch(`/users/cart/${productId}/${adjust}`);
}
export function addCart(_id,quantity){
    return axiosInstance.post(`/users/cart/${_id}`,quantity);
}
export function deleteItem(_id){
    return axiosInstance.delete(`/users/cart/${_id}`);
}
export function addAddress(updateAddress){
    return axiosInstance.post(`/users/address`,updateAddress)
}
export async function getAddressById(){
    const res= await axiosInstance.get('/users/address');
    return res.data;
}
export function addOrder(updateOrder){
    return axiosInstance.post(`/users/order`,updateOrder)
}
export async function getOrdersById(){
    return await axiosInstance.get(`/users/order`);
}
export function blockUserById(id,status){
    return axiosInstance.patch(`/admin/${id}/${status}`)
}
export async function createOrder(data){
    return await axiosInstance.post(`/payments/create-order`,data)
}
export async function verifyPayment (data){
    return axiosInstance.post(`/verify-payment`,data)
}
export async function getWishlist (){
    return axiosInstance.get(`/users/wishlist`);
}
export async function deleteWishlist (_id){
    return axiosInstance.delete(`/users/wishlist/${_id}`)
}
export async function addWishlist (_id){
    return axiosInstance.post(`/users/wishlist/${_id}`)
}