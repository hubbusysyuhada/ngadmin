const initialState = {
    datas : []
}

function SPTKeluarReducer (state = initialState, action) {
    const {payload, type} = action
    if (type === 'spt/fetch') {
        return {...state, datas: payload}
    }
    return {...state}
}

module.exports = {
    SPTKeluarReducer
}