import {
    SET_POSTS_ATTEMPT,
    SET_POSTS_SUCCEED,
    SET_POSTS_FAILED,
    USER_LOGOUT,
    LOAD_LIKE
} from '../actions/types';
const INITIAL_STATE = {
    posts: [],
    postsLoaded: false,
    refreshing: false,
}
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_POSTS_ATTEMPT:
            return { ...state, refreshing: true };
        case SET_POSTS_SUCCEED:
            return { ...state, posts: action.payLoad, postsLoaded: true, refreshing: false };
        case SET_POSTS_FAILED:
            return { ...state,refreshing:false };
        case LOAD_LIKE:
            temp = state.posts;
            temp[action.payLoad].user_like = true;
            return { ...state, posts: temp };
        case USER_LOGOUT:
            return INITIAL_STATE;
        default:
            return state;
    }
}