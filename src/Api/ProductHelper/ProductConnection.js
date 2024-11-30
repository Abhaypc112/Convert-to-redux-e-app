import axiosInstance from '../axiosInstance';

// Appi connection
export async function getCategory(){
    const res = await axiosInstance.get(`/products/categorys`);
    return res.data;
}
export async function getProducts(page,limit){
    const res = await axiosInstance.get(`/products?page=${page}&limit=${limit}`);
    return res.data;
}
export async function getHomeProducts(){
    const res = await axiosInstance.get(`/products/home`);
    return res.data;
}
export async function getProductsByCategory(category,page,limit){
    const res = await axiosInstance.get(`/products?category=${category}&page=${page}&limit=${limit}`);
    return res.data;
}
export async function getProductsById(_id){
    const res = await axiosInstance.get(`/product/${_id}`);
    return res.data;
}
export function getTotalSales(){
    return axiosInstance.get("/admin/total-sales");  
}
export function getTotalOrders(){
    return axiosInstance.get("/admin/total-orders");  
}
export function deleteProductById(id){
    return axiosInstance.delete(`/admin/${id}`);  
}
export function addProduct(data){
    return axiosInstance.post('/admin/product',data);
}
export function EditProductById(id,data){
    return axiosInstance.patch(`/admin/${id}`,data);
}