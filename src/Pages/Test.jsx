import axios from 'axios'
import React, { useEffect } from 'react'

function Test() {
    const data = {username:'abhay',password:'123456'}
    useEffect(()=>{
        axios.post('http://localhost:3001/api/user/login',data)
        .then((res) => console.log(res.data))
    })
  return (
    <div>
      <h1>haii</h1>
    </div>
  )
}

export default Test
