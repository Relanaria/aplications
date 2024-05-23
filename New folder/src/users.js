import { clearUserData, saveUserData } from "./util.js";
import {get, post} from './request.js';

const url = `http://localhost:3030`
export async function register({email, password}) {
    const result = await post( url + '/users/register', { email, password });
    saveUserData(result);
}

export async function login({email, password}) {
    const result = await post(url + '/users/login', { email, password });
    saveUserData(result);
}

export async function logout() {
    const promise = await get(url + '/users/logout');
    clearUserData();
    await promise;
}
