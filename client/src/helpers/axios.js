import asyncAxios from 'axios'

export const axios = asyncAxios.create({
    // baseURL: 'http://localhost:3000'
    baseURL: 'https://ngadmin-pwap.herokuapp.com'
})
// export const axios = axios.create({
//     baseURL: 'http://localhost:3000'
// })