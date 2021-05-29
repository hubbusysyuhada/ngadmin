const initialState = {
    datas : []
}

function SPTKeluarReducer (state = initialState, action) {
    const {payload, type} = action
    if (type === 'spt/fetch') {
        return {...state, datas: payload}
    } else if (type === 'spt/delete') {
        let temp = JSON.parse(JSON.stringify(state.datas))
        for (let i = 0; i < temp.length; i++) {
            if (temp[i].id === payload.id) {
                temp.splice(i, 1)
            }
        }
        return {...state, datas: temp}
    } else if (type === 'spt/edit') {
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
    SPTKeluarReducer
}