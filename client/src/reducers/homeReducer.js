import { GET_MATCHES, MATCHES_LOADING, GET_RANDOM_JOKE } from '../actions/types';

const initialState = {
    matches: [],
    loading: false,
    success: false,
    searchCompleted: false,
    joke: ''
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_MATCHES:
            console.log('REDUCER: Getting matches.');
            return {
                ...state,
                matches: action.payload,
                loading: false,
                success: action.success,
                searchCompleted: action.searchCompleted
            };
        case MATCHES_LOADING:
            console.log('REDUCER: Loading matches');
            return {
                ...state, 
                loading: true,
                success: false,
                searchCompleted: false
            };
        case GET_RANDOM_JOKE:
            console.log('REDUCER: Getting joke');
            return {
                ...state, 
                joke: action.payload
            };
        default:
            return state;
    }
}