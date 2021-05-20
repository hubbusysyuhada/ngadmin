import asyncAxios from 'axios'

export const axios = asyncAxios.create({
    baseURL: 'http://localhost:3000'
})
// export const axios = axios.create({
//     baseURL: 'http://localhost:3000'
// })