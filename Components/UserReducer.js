import { createStore } from 'redux';

//Action 
export function userInfo(value) {
    return {
        type: "getUserInfo",
        valueOfState: value
    };
}

//Reducer
export function changeUserInfo(state, action) {
    if (state == undefined) {
        state = ''
    }
    if (action.type === "getUserInfo") {
        return action.valueOfState;
    } else {
        return state;
    }
}

export const userStore = createStore(changeUserInfo);
