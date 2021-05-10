const initialState = {
    datas : []
}

function SuratMasukReducer (state = initialState, action) {
    const {payload, type} = action
    return {...state}
}

module.exports = {
    SuratMasukReducer
}