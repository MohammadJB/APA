import {
    USERNAME_CHANGED,
    PASSWORD_CHANGED,
    USER_LOGIN_ATTEMPT,
    USER_LOGIN_SUCCEED,
    USER_LOGIN_FAILED,
    NO_CONNECTION,
    SET_POSTS_ATTEMPT,
    SET_POSTS_SUCCEED,
    USER_LOGOUT,
    LOAD_LIKE,
    SET_POSTS_FAILED
} from './types'
export const usernameChanged = (text) => {
    return {
        type: USERNAME_CHANGED,
        payLoad: text
    }
}
export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payLoad: text
    }
}
export const userLogin = ({ username }, { password }, { navigation }) => {
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);
    return (dispatch) => {
        dispatch({ type: USER_LOGIN_ATTEMPT });
        fetch('https://apagh.venice.ir//mobile/services/action/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData.toString()
        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.login.valid === true) {
                    loginUserSucceed(dispatch, navigation, responseJson.login.cookies.ow_login);
                } else {
                    loginUserFailed(dispatch);
                }
            }).catch((error) => { noConnection(dispatch) });
    }
}
const loginUserSucceed = (dispatch, navigation, token) => {
    dispatch({ type: USER_LOGIN_SUCCEED, payLoad: token });
    getDashboard(token);
    navigation.navigate('Dashboard');
}
const loginUserFailed = (dispatch) => {
    dispatch({ type: USER_LOGIN_FAILED });
}
const noConnection = (dispatch) => {
    dispatch({ type: NO_CONNECTION });
}
export const getDashboard = (token, navigation) => {
    const formData = new URLSearchParams();
    formData.append('access_token', token);
    return (dispatch) => {
        dispatch({ type: SET_POSTS_ATTEMPT });
        fetch('https://apagh.venice.ir//mobile/services/information/get_dashboard/?first=0', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData.toString()
        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.check_login.valid === true) {
                    getDashboardSucceed(dispatch, responseJson.get_dashboard);
                } else {
                    userLogout(navigation);
                }
            }).catch((error) => { alert('خطا در ارتباط'); dispatch({ type: SET_POSTS_FAILED }) });
    }
}
const getDashboardSucceed = (dispatch, get_dashboard) => {
    dispatch({ type: SET_POSTS_SUCCEED, payLoad: get_dashboard });
}
export const loadLike = (index) => {
    return (dispatch) => { dispatch({ type: LOAD_LIKE, payLoad: index }) }
}
export const userLogout = (navigation) => {
    navigation.popToTop();
    return { type: USER_LOGOUT };
}