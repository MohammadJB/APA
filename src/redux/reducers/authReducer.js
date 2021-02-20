import {
    USERNAME_CHANGED,
    PASSWORD_CHANGED,
    USER_LOGIN_ATTEMPT,
    USER_LOGIN_SUCCEED,
    USER_LOGIN_FAILED,
    NoConnection
} from '../actions/types';
const INITIAL_STATE = {
    username: '',
    password: '',
    loading: false,
    error: '',
    valid: false
}
export default (state = INITIAL_STATE, action) => {
    console.log(action);
    switch (action.type) {
        case USERNAME_CHANGED:
            return { ...state, username: action.payLoad }
            break;
        case PASSWORD_CHANGED:
            return { ...state, password: action.payLoad }
            break;
        case USER_LOGIN_ATTEMPT:
            return { ...state, loading: true }
            break;
        case USER_LOGIN_SUCCEED:
            return { ...state, error:'',valid:true }
            break;
        case USER_LOGIN_FAILED:
            return {
                ...state,
                loading: false,
                password: '',
                error: 'نام کاربری و گذرواژه خود را به درستی وارد نمایید'
            }
            break;
        case NoConnection:
            return { ...state, 
                loading: false, 
                error:'خطا در برقراری ارتباط. لطفا مجددا تلاش فرمایید'}
            break;
        default:
            return state;
    }
}