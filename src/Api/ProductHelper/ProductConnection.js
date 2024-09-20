import axios from 'axios'


const PRODUCTS_LIST="http://localhost:5000/products";
const CATEGORY_LIST="http://localhost:5000/categorys";
const SALES="http://localhost:5000/sales";

export function getCategory(){
    return axios.get(CATEGORY_LIST)
}
export function getProducts(){
    return axios.get(PRODUCTS_LIST)
}

export function getProductsById(id){
    return axios.get(`${PRODUCTS_LIST}/${id}`)
}

export async function totalSales(data){
   return axios.post(SALES,data)
    
}
export function getTotalSales(){
    return axios.get(SALES)  
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