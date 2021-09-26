const initialState = {
    datas : null,
    uploading: false
}

function SuratMasukReducer (state = initialState, action) {
    const {payload, type} = action
    if (type === 'suratmasuk/fetch') {
        return {...state, datas: payload}
    } else if (type === 'suratmasuk/edit') {
        let temp = JSON.parse(JSON.stringify(state.datas))
        for (let i = 0; i < temp.length; i++) {
            if (temp[i].id === payload.id) {
                temp[i] = payload
            }
        }
        return {...state, datas: temp}
    } else if (type === 'suratmasuk/delete') {
        let temp = JSON.parse(JSON.stringify(state.datas))
        for (let i = 0; i < temp.length; i++) {
            if (temp[i].id === payload.id) {
                temp.splice(i, 1)
            }
        }
        return {...state, datas: temp}
    } else if (type === 'suratmasuk/uploading') {
        console.log('masuk uploading reducer');
        return {...state, uploading: true}
    } else if (type === 'suratmasuk/uploaded') {
        console.log('masuk uploaded reducer');

        let temp = JSON.parse(JSON.stringify(state.datas))
        for (let i = 0; i < temp.length; i++) {
            if (temp[i].id === payload.id) {
                temp[i].File = payload.File
            }
        }
        return {...state, uploading: false, datas: temp}
    }
    return {...state}
}

export default SuratMasukReducer