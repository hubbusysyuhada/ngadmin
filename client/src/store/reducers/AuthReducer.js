const initialState = {
    loggedUser : {},
    loginError: false
}

function AuthReducer (state = initialState, action) {
    const {payload, type} = action
    if (type === 'auth/login') {
        return {...state, loggedUser : payload}
    } else if (type === 'auth/logut') {
        return {...state, loggedUser : {}}
    } else if (type === 'auth/loginError') {
        return {...state, loginError : true}        
    } else if (type === 'auth/turnOffLoginError') {
        console.log('masuk turnoff di reducer');
        return {...state, loginError : false}        
    }
    return {...state}
}

module.exports = {
    AuthReducer
}