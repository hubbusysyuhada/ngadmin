import axios from 'axios'
const baseUrl = 'http://localhost:3000/'

export function USER_LOGIN () {
    return (dispatch) => {
        console.log('masuk actions USER_LOGIN');
        dispatch({type: 'auth/login', payload: {user: 'coba-coba dulu'}})
    }
}

export function FETCH_SURAT_MASUK () {
    return async (dispatch) => {
        const {data} = await axios({
            method: 'GET',
            url: `${baseUrl}suratmasuk`,
            headers: {
                year: 2021,
                access_token : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsIm5hbWUiOiJhZG1pbiIsImlhdCI6MTYxOTkyNjM5OH0.A5KeUT7uHTFF2V0Sp1fT5lWhqcQB6WwhbS_4U606Bck'
            }
        })
        console.log(data, '<<< response axios');
    }
}