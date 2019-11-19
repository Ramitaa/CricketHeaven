import { VIEW_PLAYER, VIEW_PLAYERS_LOADING } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';
import axios from 'axios';

export const viewPlayer = id => (dispatch, getState) => {
    console.log("ACTION viewPlayer:" + id);
    dispatch(setViewPlayersLoading());
    axios.get(`/api/players/getPlayerStatistics/${id}`, tokenConfig(getState)).then(res =>
        dispatch({
            type: VIEW_PLAYER,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}; 

export const setViewPlayersLoading = () => {
    return {
        type: VIEW_PLAYERS_LOADING
    };
};