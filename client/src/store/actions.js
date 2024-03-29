import { axios } from '../helpers/axios'
const dateLog = () => {
    return new Date().toLocaleString('fr-FR', {timeZone: 'Asia/Jakarta'}).split(',').join(' ')
}

// actions user/auth

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
        dispatch({type: 'suratmasuk/fetch', payload: null})
        dispatch({type: 'undanganmasuk/fetch', payload: null})
        dispatch({type: 'suratkeluar/fetch', payload: null})
        dispatch({type: 'spt/fetch', payload: null})
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

export function FETCH_USERS () {
    return async (dispatch) => {
        const { data } = await axios.get('/user', {
            headers: {
                access_token: localStorage.getItem('access_token')
            }
        })
        dispatch({type: 'user/fetch', payload: data.data})
    }
}

export function REGISTER_ACCOUNT (payload) {
    return (dispatch) => {
        axios.post('/register', {
            username: payload.username,
            password: payload.password,
            name: payload.name,
        })
        
        dispatch({type: 'user/register', payload: {
            username: payload.username,
            name: payload.name
        }})
    }
}

// actions surat masuk

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
            IsiDisposisi: payload.IsiDisposisi,
            logs: payload.logs
        }, {
            headers: {
                access_token: localStorage.getItem('access_token')
            }
        })
        const months = ['Januari', 'Februari', 'Maret', 'April', 'May', 'Juni', 'Juli', 'August', 'September', 'October', 'November', 'December']
        if (payload.TanggalSurat !== '-') {
            let newTanggalSurat = payload.TanggalSurat.split('-')
            payload.TanggalSurat = `${newTanggalSurat[2] < 10 ? newTanggalSurat[2][1] : newTanggalSurat[2]} ${months[newTanggalSurat[1] - 1]} ${newTanggalSurat[0]}`
        }
        if (payload.Tanggal !== '-') {
            let newTanggal = payload.Tanggal.split('-')
            payload.Tanggal = `${newTanggal[2] < 10 ? newTanggal[2][1] : newTanggal[2]} ${months[newTanggal[1] - 1]} ${newTanggal[0]}`
        }
        payload.logs.push(`${dateLog()} - EDITED by ${localStorage.name}`)
        dispatch({type: 'suratmasuk/edit', payload})
    }
}

export function ADD_SURAT_MASUK (payload) {
    return async (dispatch) => {
        await axios.post('/suratmasuk/new', {
            Tanggal: payload.Tanggal,
            NoAgendaDit: payload.NoAgendaDit,
            AsalSurat: payload.AsalSurat,
            Perihal: payload.Perihal,
            NomorSurat: payload.NomorSurat,
            TanggalSurat: payload.Tanggal,
            Tujuan: payload.Tujuan
        }, {
            headers: {
                access_token: localStorage.getItem('access_token'),
                year: localStorage.getItem('year')
            }
        })
        const { data } = await axios.get('/suratmasuk', {
            headers: {
                year: localStorage.getItem('year'),
                access_token: localStorage.getItem('access_token')
            }
        })
        dispatch({type: 'suratmasuk/fetch', payload: data})
    }
}

export function DELETE_SURAT_MASUK (props) {
    return (dispatch) => {
        axios.delete(`/suratmasuk/${props.id}`, {
            headers: {
                access_token: localStorage.getItem('access_token')
            }
        })
        dispatch({type: 'suratmasuk/delete', payload: props})
    }
}

export function UPLOAD_SURAT_MASUK (payload) {    
    return async (dispatch) => {
        dispatch({type: 'suratmasuk/uploading'})
        const response = await axios.post(`/suratmasuk/${payload.id}`, payload.formData, {
            headers: {
                access_token: localStorage.getItem('access_token'),
                name: localStorage.getItem('name')
            }
        })
        if (payload.File) payload.logs.push(`${dateLog()} - FILE CHANGED by ${localStorage.name}`)
        else payload.logs.push(`${dateLog()} - FILE UPLOADED by ${localStorage.name}`)
        payload.File = response.data
        dispatch({type: 'suratmasuk/uploaded', payload})
    }
}

// actions undangan masuk

export function FETCH_UNDANGAN_MASUK () {
    return async (dispatch) => {
        const {data} = await axios.get('/undanganmasuk', {
            headers: {
                year: localStorage.getItem('year'),
                access_token: localStorage.getItem('access_token')
            }
        })
        dispatch({type: 'undanganmasuk/fetch', payload: data})
    }
}

export function ADD_UNDANGAN_MASUK (payload) {
    return async (dispatch) => {
        await axios.post('/undanganmasuk/new', {
            Tanggal: payload.Tanggal,
            NoAgendaDit: payload.NoAgendaDit,
            AsalSurat: payload.AsalSurat,
            Perihal: payload.Perihal,
            NomorSurat: payload.NomorSurat,
            TanggalSurat: payload.Tanggal,
            Tujuan: payload.Tujuan,
            Tempat: payload.Tempat,
            Waktu: payload.Waktu
        }, {
            headers: {
                access_token: localStorage.getItem('access_token'),
                year: localStorage.getItem('year')
            }
        })
        const { data } = await axios.get('/undanganmasuk', {
            headers: {
                year: localStorage.getItem('year'),
                access_token: localStorage.getItem('access_token')
            }
        })
        dispatch({type: 'undanganmasuk/fetch', payload: data})
    }
}

export function DELETE_UNDANGAN_MASUK (props) {
    return (dispatch) => {
        axios.delete(`/undanganmasuk/${props.id}`, {
            headers: {
                access_token: localStorage.getItem('access_token')
            }
        })
        dispatch({type: 'undanganmasuk/delete', payload: props})
    }
}

export function EDIT_UNDANGAN_MASUK (payload) {
    return (dispatch) => {

        axios.put(`/undanganmasuk/${payload.id}`, {
            Tanggal: payload.Tanggal,
            NoAgendaSubdit: payload.NoAgendaSubdit,
            NoAgendaDit: payload.NoAgendaDit,
            AsalSurat: payload.AsalSurat,
            NomorSurat: payload.NomorSurat,
            Tujuan: payload.Tujuan,
            TanggalSurat: payload.TanggalSurat,
            Perihal: payload.Perihal,
            DisposisiSeksie: JSON.stringify(payload.DisposisiSeksie),
            DisposisiStaff: JSON.stringify(payload.DisposisiStaff),
            Catatan: payload.Catatan,
            IsiDisposisi: payload.IsiDisposisi,
            Tempat: payload.Tempat,
            Waktu: payload.Waktu,
            logs: payload.logs
        }, {
            headers: {
                access_token: localStorage.getItem('access_token')
            }
        })
        const months = ['Januari', 'Februari', 'Maret', 'April', 'May', 'Juni', 'Juli', 'August', 'September', 'October', 'November', 'December']
        if (payload.TanggalSurat !== '-') {
            let newTanggalSurat = payload.TanggalSurat.split('-')
            payload.TanggalSurat = `${newTanggalSurat[2] < 10 ? newTanggalSurat[2][1] : newTanggalSurat[2]} ${months[newTanggalSurat[1] - 1]} ${newTanggalSurat[0]}`
        }
        if (payload.Tanggal !== '-') {
            let newTanggal = payload.Tanggal.split('-')
            payload.Tanggal = `${newTanggal[2] < 10 ? newTanggal[2][1] : newTanggal[2]} ${months[newTanggal[1] - 1]} ${newTanggal[0]}`
        }
        payload.logs.push(`${dateLog()} - EDITED by ${localStorage.name}`)
        dispatch({type: 'undanganmasuk/edit', payload})
    }
}

export function UPLOAD_UNDANGAN_MASUK (payload) {

    return async (dispatch) => {
        dispatch({type: 'undanganmasuk/uploading'})
        const response = await axios.post(`/undanganmasuk/${payload.id}`, payload.formData, {
            headers: {
                access_token: localStorage.getItem('access_token'),
                name: localStorage.getItem('name')
            }
        })
        if (payload.File) payload.logs.push(`${dateLog()} - FILE CHANGED by ${localStorage.name}`)
        else payload.logs.push(`${dateLog()} - FILE UPLOADED by ${localStorage.name}`)
        payload.File = response.data
        dispatch({type: 'undanganmasuk/uploaded', payload})
    }
}

// actions surat keluar

export function FETCH_SURAT_KELUAR () {
    return async (dispatch) => {

        let {data} = await axios.get('/suratkeluar', {
            headers: {
                year: localStorage.getItem('year'),
                access_token: localStorage.getItem('access_token')
            }
        })
        for (let i = 0; i < data.length; i++) {
            data[i].index = i
            if (data[i].File) data[i].File = JSON.parse(data[i].File)
        }
        data.reverse()
        dispatch({type: 'suratkeluar/fetch', payload: data})
    }
}

export function EDIT_SURAT_KELUAR (payload) {
    return (dispatch) => {
        axios.put(`/suratkeluar/${payload.id}`, {
            TanggalSurat: payload.TanggalSurat,
            NomorSurat: payload.NomorSurat,
            type: payload.type,
            Tujuan: payload.Tujuan,
            Perihal: payload.Perihal,
            Waktu: payload.Waktu,
            Tempat: payload.Tempat,
            PenyusunKonsep: payload.PenyusunKonsep,
            logs: payload.logs
        }, {
            headers: {
                access_token: localStorage.getItem('access_token')
            }
        })
        const months = ['Januari', 'Februari', 'Maret', 'April', 'May', 'Juni', 'Juli', 'August', 'September', 'October', 'November', 'December']
        if (payload.TanggalSurat !== '-') {
            let newTanggalSurat = payload.TanggalSurat.split('-')
            payload.TanggalSurat = `${newTanggalSurat[2] < 10 ? newTanggalSurat[2][1] : newTanggalSurat[2]} ${months[newTanggalSurat[1] - 1]} ${newTanggalSurat[0]}`
        }
        payload.logs.push(`${dateLog()} - EDITED by ${localStorage.name}`)
        dispatch({type: 'suratkeluar/edit', payload})
    }
}

export function DELETE_SURAT_KELUAR (props) {
    return (dispatch) => {
        axios.delete(`/suratkeluar/${props.id}`, {
            headers: {
                access_token: localStorage.getItem('access_token')
            }
        })
        dispatch({type: 'suratkeluar/delete', payload: props})
    }
}

export function ADD_SURAT_KELUAR (payload) {
    return async (dispatch) => {
        await axios.post('/suratkeluar/new', {
            TanggalSurat: payload.TanggalSurat,
            Tujuan: payload.Tujuan,
            Perihal: payload.Perihal,
            Waktu: payload.Waktu,
            Tempat: payload.Tempat,
            PenyusunKonsep: payload.PenyusunKonsep,
            type: payload.type
        }, {
            headers: {
                access_token: localStorage.getItem('access_token'),
                year: localStorage.getItem('year')
            }
        })
        let {data} = await axios.get('/suratkeluar', {
            headers: {
                year: localStorage.getItem('year'),
                access_token: localStorage.getItem('access_token')
            }
        })
        data.reverse()
        for (let i = 0; i < data.length; i++) {
            data[i].index = i
        }
        dispatch({type: 'suratkeluar/fetch', payload: data})
    }
}

export function BOOK_SURAT_KELUAR (payload) {
    return async (dispatch) => {
        await axios.post('/suratkeluar/book', {
            TanggalSurat: payload.TanggalSurat,
            ammount: payload.ammount,
            type: payload.type
        }, {
            headers: {
                access_token: localStorage.getItem('access_token'),
                year: localStorage.getItem('year')
            }
        })
        let {data} = await axios.get('/suratkeluar', {
            headers: {
                year: localStorage.getItem('year'),
                access_token: localStorage.getItem('access_token')
            }
        })
        data.reverse()
        for (let i = 0; i < data.length; i++) {
            data[i].index = i
        }
        dispatch({type: 'suratkeluar/fetch', payload: data})
    }
}

export function UPLOAD_SURAT_KELUAR (payload) {

    return async (dispatch) => {
        dispatch({type: 'suratkeluar/uploading'})
        const response = await axios.post(`/suratkeluar/${payload.id}`, payload.formData, {
            headers: {
                access_token: localStorage.getItem('access_token'),
                name: localStorage.getItem('name')
            }
        })
        if (payload.File) payload.logs.push(`${dateLog()} - FILE CHANGED by ${localStorage.name}`)
        else payload.logs.push(`${dateLog()} - FILE UPLOADED by ${localStorage.name}`)
        payload.File = response.data
        dispatch({type: 'suratkeluar/uploaded', payload})
    }
}

// actions SPT

export function FETCH_SPT () {
    return async (dispatch) => {
        let {data} = await axios.get('/spt', {
            headers: {
                year: localStorage.getItem('year'),
                access_token: localStorage.getItem('access_token')
            }
        })
        for (let i = 0; i < data.length; i++) {
            data[i].index = i
        }
        data.reverse()
        dispatch({type: 'spt/fetch', payload: data})
    }
}

export function ADD_SPT (payload) {
    return async (dispatch) => {
        if (payload.Ditujukan) {
            payload.Ditujukan = JSON.parse(JSON.stringify(payload.Ditujukan))?.split(',')
            for (let i = 0; i < payload.Ditujukan.length; i++) payload.Ditujukan[i] = payload.Ditujukan[i].trim()
        }
        else payload.Ditujukan = ['booked']
        const months = ['Januari', 'Februari', 'Maret', 'April', 'May', 'Juni', 'Juli', 'August', 'September', 'October', 'November', 'December']
        let temp = payload.TanggalSurat.split('-')
        payload.TanggalSurat = `${temp[2]} ${months[+(temp[1]) - 1]} ${temp[0]}`
        await axios.post('/spt/new', {
            TanggalSurat: payload.TanggalSurat,
            Ditujukan: JSON.stringify(payload.Ditujukan),
            DalamRangka: payload.DalamRangka,
            Waktu: payload.Waktu,
            Tempat: payload.Tempat,
            PenyusunKonsep: payload.PenyusunKonsep,
            type: payload.type
        }, {
            headers: {
                access_token: localStorage.getItem('access_token'),
                year: localStorage.getItem('year')
            }
        })
        let {data} = await axios.get('/spt', {
            headers: {
                year: localStorage.getItem('year'),
                access_token: localStorage.getItem('access_token')
            }
        })
        for (let i = 0; i < data.length; i++) {
            data[i].index = i
        }
        data.reverse()
        dispatch({type: 'spt/fetch', payload: data})
    }
}

export function BOOK_SPT (payload) {
    return async (dispatch) => {
        await axios.post('/spt/book', {
            TanggalSurat: payload.TanggalSurat,
            ammount: payload.ammount
        }, {
            headers: {
                access_token: localStorage.getItem('access_token'),
                year: localStorage.getItem('year')
            }
        })
        let {data} = await axios.get('/spt', {
            headers: {
                year: localStorage.getItem('year'),
                access_token: localStorage.getItem('access_token')
            }
        })
        for (let i = 0; i < data.length; i++) {
            data[i].index = i
        }
        data.reverse()
        dispatch({type: 'spt/fetch', payload: data})
    }
}

export function EDIT_SPT (payload) {
    return (dispatch) => {
        const months = ['Januari', 'Februari', 'Maret', 'April', 'May', 'Juni', 'Juli', 'August', 'September', 'October', 'November', 'December']
        let newTanggalSurat = payload.TanggalSurat.split('-')
        payload.TanggalSurat = `${newTanggalSurat[2] < 10 ? newTanggalSurat[2][1] : newTanggalSurat[2]} ${months[newTanggalSurat[1] - 1]} ${newTanggalSurat[0]}`
        // axios di sini sebelum reassign bentuk tanggal baru
        axios.put(`/spt/${payload.id}`, {
            TanggalSurat: payload.TanggalSurat,
            NomorSurat: payload.NomorSurat,
            Ditujukan: payload.Ditujukan,
            DalamRangka: payload.DalamRangka,
            Waktu: payload.Waktu,
            Tempat: payload.Tempat,
            PenyusunKonsep: payload.PenyusunKonsep,
            logs: payload.logs
        }, {
            headers: {
                access_token: localStorage.getItem('access_token')
            }
        })

        payload.Ditujukan = payload.Ditujukan.split(',')
        payload.Ditujukan.forEach(person => person = person.trim())
        payload.logs.push(`${dateLog()} - EDITED by ${localStorage.name}`)
        dispatch({type: 'spt/edit', payload})
    }
}

export function DELETE_SPT (props) {
    return (dispatch) => {
        axios.delete(`/spt/${props.id}`, {
            headers: {
                access_token: localStorage.getItem('access_token')
            }
        })
        dispatch({type: 'spt/delete', payload: props})
    }
}

export function UPLOAD_SPT (payload) {

    return async (dispatch) => {
        dispatch({type: 'spt/uploading'})
        const response = await axios.post(`/spt/${payload.id}`, payload.formData, {
            headers: {
                access_token: localStorage.getItem('access_token'),
                name: localStorage.getItem('name')
            }
        })
        if (payload.File) payload.logs.push(`${dateLog()} - FILE CHANGED by ${localStorage.name}`)
        else payload.logs.push(`${dateLog()} - FILE UPLOADED by ${localStorage.name}`)
        payload.File = response.data
        dispatch({type: 'spt/uploaded', payload})
    }
}