import {combineReducers} from 'redux';
import AuthReducer from './authReducer'
import DashBoardReducer from './dashboardReducer'
export default combineReducers({
    auth : AuthReducer,
    dashboard : DashBoardReducer
});