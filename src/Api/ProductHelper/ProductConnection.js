import axios from 'axios'


const PRODUCTS_LIST="http://localhost:5000/products";
const CATEGORY_LIST="http://localhost:5000/categorys";
const SALES="http://localhost:5000/sales";

export function getCategory(){
    return axios(CATEGORY_LIST)
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
    return axios.get(`${PRODUCTS_LIST}/${id}`)  
}