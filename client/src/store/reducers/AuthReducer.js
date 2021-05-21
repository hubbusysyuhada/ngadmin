const initialState = {
    loggedUser : null,
    loginError: false,
}

function AuthReducer (state = initialState, action) {
    const {payload, type} = action
    if (type === 'auth/login') {
        return {...state, loggedUser : payload}
    } else if (type === 'auth/logout') {
        return {...state, loggedUser : null}
    } else if (type === 'auth/setUser') {
        return {...state, loggedUser : payload}
    } else if (type === 'auth/loginError') {
        return {...state, loginError : true}        
    } else if (type === 'auth/turnOffLoginError') {
        return {...state, loginError : false}        
    }
    return {...state}
}

module.exports = {
    AuthReducer
}