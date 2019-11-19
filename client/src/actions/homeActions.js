import { GET_MATCHES, MATCHES_LOADING, GET_RANDOM_JOKE } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';
import axios from 'axios';

export const getMatches = () => (dispatch, getState) => {
    console.log('Getting matches!');
    dispatch(setMatchesLoading());
    axios.get('/api/players/getMatches', tokenConfig(getState)).then(res =>
        dispatch({
            type: GET_MATCHES,
            payload: res.data.response,
            success: res.data.success,
            searchCompleted: res.data.searchCompleted
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}; 

export const setMatchesLoading = () => {
    return {
        type: MATCHES_LOADING
    };
};

export const getJoke = () => (dispatch, getState) => {
    console.log('Getting jokes!');

    axios.post(`/api/jokes/getRandomJoke`).then(res =>
        dispatch({
            type: GET_RANDOM_JOKE, 
            payload: res.data
        })
    )
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));

    /*dispatch({
        type: GET_TRANSLATED_CRICKET_JOKE, 
        payload: 'res.data'
    });*/
};