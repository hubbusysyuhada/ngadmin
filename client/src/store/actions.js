import { axios } from '../helpers/axios'
const baseUrl = 'http://localhost:3000/'

export function USER_LOGIN (param) {
    return async (dispatch) => {
        try {
            const { data } = await axios.post('/login', {
                username: param.username,
                password: param.password
            })
            if (data) {
                dispatch({type: 'auth/login', payload: data})
                localStorage.setItem('name', data.name)
                localStorage.setItem('access_token', data.access_token)
                localStorage.setItem('year', param.year)
            }
        } catch (error) {
            dispatch({type: 'auth/loginError'})
            console.log(error, '<<< error');
            return error
        }
    }
}

export function USER_LOGOUT () {
    return (dispatch) => {
        dispatch({type: 'auth/logout'})
    }
}

export function TURN_OFF_LOGIN_ERROR () {
    return (dispatch) => {
        dispatch({type: 'auth/turnOffLoginError'})
    }
}

export function SET_USER () {
    return (dispatch) => {
        const {name, access_token} = localStorage
        const payload = {
            name,
            access_token
        }
        dispatch({type: 'auth/setUser', payload})
    }
}

export function FETCH_SURAT_MASUK () {
    return async (dispatch) => {
        const {data} = await axios.get('/suratmasuk', {
            headers: {
                year: localStorage.getItem('year'),
                access_token: localStorage.getItem('access_token')
            }
        })
        console.log(data, '<<<< data surat masuk');
        dispatch({type: 'suratmasuk/fetch', payload: data})
    }
}