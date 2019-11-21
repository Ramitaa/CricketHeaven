import { 
    USER_LOADING, 
    USER_LOADED, 
    AUTH_ERROR, 
    LOGIN_SUCCESS, 
    LOGIN_FAIL, 
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    UPDATE_PASSWORD_LOADING,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL
 } from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null,
    isUpdatePasswordLoading: false,
    updatedUser: null
};

export default function(state = initialState, action){

    switch(action.type)
    {
        case USER_LOADING:
            return {
                ...state, 
                isLoading: true
            };
        case UPDATE_PASSWORD_LOADING:
            return {
                ...state,
                isUpdatePasswordLoading: true
            };
        case USER_LOADED:
            return {
                ...state, 
                isAuthenticated: true,
                isLoading: false, 
                user: action.payload,
                isUpdatePasswordLoading: false
            };
        
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state, 
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
                isUpdatePasswordLoading: false
            };
        
        case UPDATE_PASSWORD_SUCCESS:
                return {
                    ...state, 
                    updatedUser: action.payload,
                    isAuthenticated: true,
                    isLoading: false,
                    isUpdatePasswordLoading: false
                };

        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            localStorage.removeItem('token');
            return {
                ...state, 
                token: null, 
                isAuthenticated: false,
                isLoading: false,
                user: null,
                isUpdatePasswordLoading: false
            };
        case UPDATE_PASSWORD_FAIL:
            return {
                ...state, 
                isUpdatePasswordLoading: false
            }
        default:
            return state;
    }

}


