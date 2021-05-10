const initialState = {
    loggedUser : {}
}

function AuthReducer (state = initialState, action) {
    const {payload, type} = action
    if (type === 'auth/login') {
        console.log(payload, '<<< payload from reducers');
        return {...state, loggedUser : payload}
    }
    return {...state}
}

module.exports = {
    AuthReducer
}