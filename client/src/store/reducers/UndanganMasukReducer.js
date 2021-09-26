const initialState = {
    datas : null,
    uploading: false
}

function UndanganMasukReducer (state = initialState, action) {
    const {payload, type} = action
    if (type === 'undanganmasuk/fetch') {
        return {...state, datas: payload}
    } else if (type === 'undanganmasuk/delete') {
        let temp = JSON.parse(JSON.stringify(state.datas))
        for (let i = 0; i < temp.length; i++) {
            if (temp[i].id === payload.id) {
                temp.splice(i, 1)
            }
        }
        return {...state, datas: temp}
    } else if (type === 'undanganmasuk/edit') {
        let temp = JSON.parse(JSON.stringify(state.datas))
        for (let i = 0; i < temp.length; i++) {
            if (temp[i].id === payload.id) {
                temp[i] = payload
            }
        }
        return {...state, datas: temp}
    } else if (type === 'undanganmasuk/uploading') {
        console.log('masuk uploading reducer');
        return {...state, uploading: true}
    } else if (type === 'undanganmasuk/uploaded') {
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

export default UndanganMasukReducer