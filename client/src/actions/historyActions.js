import { GET_SEARCH_HISTORY, SEARCH_HISTORY_LOADING, DELETE_SEARCH_HISTORY } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';
import axios from 'axios';

export const getHistory = () => (dispatch, getState) => {
    console.log('Getting histories!');
    dispatch(setHistoryLoading());
    axios.get(`/api/players/getHistory/`, tokenConfig(getState)).then(res =>
        dispatch({
            type: GET_SEARCH_HISTORY,
            payload: res.data.response,
            success: res.data.success,
            searchCompleted: res.data.searchCompleted
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}; 

export const deleteHistory = id => (dispatch, getState) => {
    axios.delete(`api/players/${id}`, tokenConfig(getState))
    .then(res => dispatch({
        type: DELETE_SEARCH_HISTORY,
        payload: id
    }))
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const setHistoryLoading = () => {
    return {
        type: SEARCH_HISTORY_LOADING
    };
};