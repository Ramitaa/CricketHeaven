import axios from 'axios';
import { returnErrors } from './errorActions';
import { clearErrors } from './errorActions';

import {
    USER_LOADED, 
    USER_LOADING,
    AUTH_ERROR, 
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGOUT_SUCCESS
} from './types';

// Check authorization and load user
export const loadUser = () => (dispatch, getState) => {

    console.log("authActions: Loading users!");

    dispatch({ type: USER_LOADING });
    
    axios.get('/api/users/getUserToken', tokenConfig(getState))
    .then(res => {
        dispatch(clearErrors());
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    })
    .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status, 'AUTH_ERROR'));
        dispatch({
            type: AUTH_ERROR
        });
    });

};

// Register new user
export const registerActions = ({ name, email, password }) => dispatch => {

    // Headers
    const config = {
        headers:{
            'Content-type': 'application/json'
        }
    }

    const body = JSON.stringify({ name, email, password });

    console.log("Im inside here!");
    axios.post('/api/users/register', body, config)
    .then(res => {
        dispatch(clearErrors());
        dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
        });
    })
    .catch(err => {
        dispatch( returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
        dispatch({
            type: REGISTER_FAIL
        });
    });
};

// Login user
export const loginActions = ({ email, password }) => dispatch => {

    // Headers
    const config = {
        headers:{
            'Content-type': 'application/json'
        }
    }

    const body = JSON.stringify({ email, password });

    axios.post('api/users/login', body, config)
    .then(res => {
        dispatch(clearErrors());
        dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
        });
    })
    .catch(err => {
        dispatch( returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
        dispatch({
            type: LOGIN_FAIL
        });
    });
};

//Log out user
export const logout = () => (dispatch) => {
    dispatch(clearErrors());
    dispatch({
        type: LOGOUT_SUCCESS
    });
};

// Setup config/headers and token
export const tokenConfig = getState => {

    const token = getState().auth.token;

    const config = {
        headers: {
            "Content-type": "application/json"}}

    if(token){
        config.headers['x-auth-token'] = token; }

    return config; 
};
