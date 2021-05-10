const initialState = {
    datas : []
}

function SPTKeluarReducer (state = initialState, action) {
    const {payload, type} = action
    return {...state}
}

module.exports = {
    SPTKeluarReducer
}