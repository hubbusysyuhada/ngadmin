import { axios } from '../helpers/axios'

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
        dispatch({type: 'suratmasuk/fetch', payload: data})
    }
}

export function EDIT_SURAT_MASUK (payload) {
    return (dispatch) => {

        // axios di sini sebelum reassign bentuk tanggal baru
        axios.put(`/suratmasuk/${payload.id}`, {
            Tanggal: payload.Tanggal,
            NoAgendaSubdit: payload.NoAgendaSubdit,
            NoAgendaDit: payload.NoAgendaDit,
            AsalSurat: payload.AsalSurat,
            NomorSurat: payload.NomorSurat,
            Tujuan: payload.Tujuan,
            TanggalSurat: payload.TanggalSurat,
            Perihal: payload.Perihal,
            DisposisiSeksie: payload.DisposisiSeksie,
            DisposisiStaff: payload.DisposisiStaff,
            Catatan: payload.Catatan,
            IsiDisposisi: payload.IsiDisposisi
        }, {
            headers: {
                access_token: localStorage.getItem('access_token')
            }
        })

        const months = ['Januari', 'Februari', 'Maret', 'April', 'May', 'Juni', 'Juli', 'August', 'September', 'October', 'November', 'December']
        let newTanggal = payload.Tanggal.split('-')
        payload.Tanggal = `${newTanggal[2] < 10 ? newTanggal[2][1] : newTanggal[2]} ${months[newTanggal[1] - 1]} ${newTanggal[0]}`
        let newTanggalSurat = payload.TanggalSurat.split('-')
        payload.TanggalSurat = `${newTanggalSurat[2] < 10 ? newTanggalSurat[2][1] : newTanggalSurat[2]} ${months[newTanggalSurat[1] - 1]} ${newTanggalSurat[0]}`
        dispatch({type: 'suratmasuk/edit', payload})
    }
}