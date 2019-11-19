import { PLAYERS_LOADING, SEARCH_PLAYERS} from '../actions/types';

const initialState = {
    players: [],
    loading: false,
    success: false,
    searchCompleted: false
}

export default function(state = initialState, action){
    switch(action.type){
        case SEARCH_PLAYERS:
            console.log('REDUCER: Searching for players');
            return {
                ...state,
                players: action.payload,
                loading: false,
                success: action.success,
                searchCompleted: action.searchCompleted
            };
        case PLAYERS_LOADING:
            console.log('REDUCER: Loading players');
            return {
                ...state, 
                loading: true,
                success: false,
                searchCompleted: false
            };
        default:
            return state;
    }
}