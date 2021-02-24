import {
    USERNAME_CHANGED,
    PASSWORD_CHANGED,
    USER_LOGIN_ATTEMPT,
    USER_LOGIN_SUCCEED,
    USER_LOGIN_FAILED,
    NO_CONNECTION,
    USER_LOGOUT,
} from '../actions/types';
const INITIAL_STATE = {
    username: '',
    password: '',
    loading: false,
    error: '',
    accessToken: ''
}
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USERNAME_CHANGED:
            return { ...state, username: action.payLoad };
        case PASSWORD_CHANGED:
            return { ...state, password: action.payLoad };
        case USER_LOGIN_ATTEMPT:
            return { ...state, loading: true };
        case USER_LOGIN_SUCCEED:
            return { ...state, error:'',accessToken:action.payLoad, loading:false };
        case USER_LOGIN_FAILED:
            return {
                ...state,
                loading: false,
                password: '',
                error: 'نام کاربری و گذرواژه خود را به درستی وارد نمایید'
            };
        case NO_CONNECTION:
            return { ...state, 
                loading: false, 
                error:'خطا در برقراری ارتباط. لطفا مجددا تلاش فرمایید'};
        case USER_LOGOUT:
            return INITIAL_STATE;
        default:
            return state;
    }
}