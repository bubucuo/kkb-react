import {LOGIN_SUCCESS} from "./const";

export const login = userInfo => ({type: LOGIN_SUCCESS, payload: userInfo});
