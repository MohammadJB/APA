import {
    USERNAME_CHANGED,
    PASSWORD_CHANGED,
    USER_LOGIN_ATTEMPT,
    USER_LOGIN_SUCCEED,
    USER_LOGIN_FAILED,
    NoConnection
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
                if (responseJson['login']['valid'] === true) {
                    loginUserSucceed(dispatch, navigation);
                } else {
                    loginUserFailed(dispatch);
                }
            }).catch((error) => {noConnection(dispatch) });
    }
}
const loginUserSucceed = (dispatch, navigation, username) => {
    dispatch({ type: USER_LOGIN_SUCCEED });
    navigation.navigate('Dashboard', { name: username });
}
const loginUserFailed = (dispatch) => {
    dispatch({ type: USER_LOGIN_FAILED });
}
const noConnection = (dispatch) => {
    dispatch({ type: NoConnection });
}