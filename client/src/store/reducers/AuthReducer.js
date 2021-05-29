const initialState = {
    loggedUser : null,
    loginError: false,
    userList: []
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
    } else if (type === 'user/fetch') {
        return {...state, userList: payload}        
    } else if (type === 'user/register') {
        let temp = JSON.parse(JSON.stringify(state.userList))
        temp.push(payload)
        return {...state, userList: temp}        
    }
    return {...state}
}

module.exports = {
    AuthReducer
}