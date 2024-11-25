import axios from 'axios'

const token = localStorage.getItem('token');
const authorization = {headers: { 'authorization':token }};

const PRODUCTS_LIST="http://localhost:5000/products";
const SALES="http://localhost:5000/sales";

export async function getCategory(){
    const res = await axios.get('http://localhost:3001/api/products/categorys');
    return res.data;
}
export async function getProducts(){
    const res = await axios.get('http://localhost:3001/api/products');
    return res.data;
}
export async function getProductsByCategory(category){
    const res = await axios.get(`http://localhost:3001/api/products?category=${category}`);
    return res.data;
}

export async function getProductsById(_id){
    const res = await axios.get(`http://localhost:3001/api/product/${_id}`);
    return res.data;
}

export async function totalSales(data){
   return axios.post(SALES,data)
    
}
export function getTotalSales(){
    return axios.get("http://localhost:3001/api/admin/totalsales",authorization)  
}
export function getTotalOrders(){
    return axios.get("http://localhost:3001/api/admin/totalorders",authorization)  
}
export function deleteProductById(id){
    return axios.delete(`${PRODUCTS_LIST}/${id}`)  
}

export function addProduct(data){
    return axios.post(PRODUCTS_LIST,data)
}

export function EditProductById(id,data){
    return axios.patch(`${PRODUCTS_LIST}/${id}`,data)
}