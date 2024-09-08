import axios from 'axios'


const USERS_LIST="http://localhost:5000/users";

export function getAllUsers(){
    return axios.get(USERS_LIST)
}

export function addUserData(data){
    return axios.post(USERS_LIST,data)
}