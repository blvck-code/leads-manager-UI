import axios from 'axios'
import {returnErrors} from './messages'
import {USER_LOADED, LOGOUT_SUCCESS, USER_LOADING, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, REGISTER_SUCCESS, REGISTER_FAIL} from './types'

// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {

    // User loading
    dispatch({type: USER_LOADING})

    axios.get('https://leads-manager-backend.herokuapp.com/api/auth/user', tokenConfig(getState))
    .then(res => {
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch({
            type: AUTH_ERROR
        })
    })
}

// LOGIN USER
export const login = (email, password) => (dispatch) => {
   
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({email, password})


    axios.post('https://leads-manager-backend.herokuapp.com/api/auth/login', body, config)
    .then(res => {
        if(res.data.non_field_errors) {
            dispatch(returnErrors(res.data.non_field_errors.join(), 400))
        }else {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
        }
    })
    .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status))
        dispatch({
            type: LOGIN_FAIL
        })
    })
}

// REGISTER USER
export const register = (email, username, password) => (dispatch) => {
   
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({email, username, password})


    axios.post('https://leads-manager-backend.herokuapp.com/api/auth/register', body, config)
    .then(res => {
        console.log(res.status);
        if(res.data.non_field_errors) {
            dispatch(returnErrors(res.data.non_field_errors.join(), 400))
        }else {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
        }
    })
    .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status))
        dispatch({
            type: REGISTER_FAIL
        })
    })
}

//LOGOUT USER
export const logOut = () => (dispatch, getState) => {

    axios.post('https://leads-manager-backend.herokuapp.com/api/auth/logout', null, tokenConfig(getState))
    .then(res => {
        dispatch({
            type: LOGOUT_SUCCESS,
        })
        loadUser();
    })
    .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status))
    })
}

//Set config with token 
export const tokenConfig = getState => {
    
    // Get token from state
    const token = getState().auth.token;

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // If token, add to headers config
    if(token){
        config.headers['Authorization'] = `Token ${token}`
    }

    return config
}