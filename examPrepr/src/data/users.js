import { clearUserData, saveUserData } from "../util.js";
import {get, post} from './request.js';

// email passord sa destructorirani moje i da ne e taka!!! moje da ima i drugi propertyta
// TODO ednpoints moje da se naloji da se promenqt!!
export async function register({email, password}) {
    console.log(email,password);
    debugger;
    const result = await post('/users/register', { email, password });
    saveUserData(result);
}

export async function login({email, password}) {
    const result = await post('/users/login', { email, password });
    saveUserData(result);
}

export async function logout() {
    const promise = get('/users/logout');
    clearUserData();
    await promise;
}

// const promise = await get(url + '/users/logout');
// clearUserData();
// await promise;
