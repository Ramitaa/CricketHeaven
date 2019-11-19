import { VIEW_PLAYER, VIEW_PLAYERS_LOADING} from '../actions/types';

const initialState = {
    i_player: {},
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case VIEW_PLAYER:
            console.log('REDUCER: View player.');
            return {
                ...state,
                i_player: action.payload,
                loading: false
            };
        case VIEW_PLAYERS_LOADING:
            console.log('REDUCER: Loading view players');
            return {
                ...state, 
                loading: true
            };
        default:
            return state;
    }
}