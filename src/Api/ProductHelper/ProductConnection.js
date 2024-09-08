import axios from 'axios'


const PRODUCTS_LIST="http://localhost:5000/products";
const CATEGORY_LIST="http://localhost:5000/categorys";

export function getCategory(){
    return axios(CATEGORY_LIST)
}
export function getProducts(){
    return axios.get(PRODUCTS_LIST)
}

export function getProductsById(id){
    return axios.get(`${PRODUCTS_LIST}/${id}`)
}