import { SEARCH_PLAYERS, PLAYERS_LOADING } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';
import axios from 'axios';

export const searchPlayers = name => (dispatch, getState) => {
    dispatch(setPlayersLoading());
    axios.get(`/api/players/getPlayer/${name}`, tokenConfig(getState)).then(res =>
        dispatch({
            type: SEARCH_PLAYERS,
            payload: res.data.response,
            success: res.data.success,
            searchCompleted: res.data.searchCompleted
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}; 

export const setPlayersLoading = () => {
    return {
        type: PLAYERS_LOADING
    };
};