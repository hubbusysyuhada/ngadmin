const initialState = {
    datas : null
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
    }
    return {...state}
}

module.exports = {
    SuratMasukReducer
}