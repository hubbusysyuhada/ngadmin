const initialState = {
    datas : []
}

function SuratKeluarReducer (state = initialState, action) {
    const {payload, type} = action
    return {...state}
}

module.exports = {
    SuratKeluarReducer
}