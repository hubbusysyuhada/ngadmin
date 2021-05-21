const initialState = {
    datas : null
}

function SuratMasukReducer (state = initialState, action) {
    const {payload, type} = action
    if (type === 'suratmasuk/fetch') {
        return {...state, datas: payload}
    }
    return {...state}
}

module.exports = {
    SuratMasukReducer
}