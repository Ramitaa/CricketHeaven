import { GET_SEARCH_HISTORY, SEARCH_HISTORY_LOADING, DELETE_SEARCH_HISTORY } from '../actions/types';

const initialState = {
    histories: [],
    loading: false,
    success: false,
    searchCompleted: false
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_SEARCH_HISTORY:
            console.log('REDUCER: Getting histories.');
            return {
                ...state,
                histories: action.payload,
                loading: false,
                success: action.success,
                searchCompleted: action.searchCompleted
            };
        case SEARCH_HISTORY_LOADING:
            console.log('REDUCER: Loading histories.');
            return {
                ...state, 
                loading: true,
                success: false,
                searchCompleted: false
            };
        
        case DELETE_SEARCH_HISTORY:
            console.log('REDUCER: Deleting search history.');
            return {
                ...state,
                histories: state.histories.filter(histories => histories._id !== action.payload)
            }
        default:
            return state;
    }
}