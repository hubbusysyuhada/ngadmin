const initialState = {
    datas : []
}

function UndanganMasukReducer (state = initialState, action) {
    const {payload, type} = action
    return {...state}
}

module.exports = {
    UndanganMasukReducer
}