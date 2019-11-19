import { combineReducers } from 'redux';
import playerReducer from './playerReducer';
import viewPlayerReducer from './viewPlayerReducer';
import homeReducer from './homeReducer';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import historyReducer from './historyReducer';

export default combineReducers({
    player: playerReducer,
    i_player: viewPlayerReducer,
    match: homeReducer,
    auth: authReducer,
    error: errorReducer,
    histories: historyReducer
});