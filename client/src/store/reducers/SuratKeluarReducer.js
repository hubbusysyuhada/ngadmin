const initialState = {
    datas : null,
    uploading: false
}

function SuratKeluarReducer (state = initialState, action) {
    const {payload, type} = action
    if (type === 'suratkeluar/fetch') {
        return {...state, datas: payload}
    } else if (type === 'suratkeluar/edit') {
        let temp = JSON.parse(JSON.stringify(state.datas))
        for (let i = 0; i < temp.length; i++) {
            if (temp[i].id === payload.id) {
                temp[i] = payload
            }
        }
        return {...state, datas: temp}
    } else if (type === 'suratkeluar/delete') {
        let temp = JSON.parse(JSON.stringify(state.datas))
        for (let i = 0; i < temp.length; i++) {
            if (temp[i].id === payload.id) {
                temp.splice(i, 1)
            }
        }
        return {...state, datas: temp}
    } else if (type === 'suratkeluar/uploading') {
        return {...state, uploading: true}
    } else if (type === 'suratkeluar/uploaded') {

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

export default SuratKeluarReducer