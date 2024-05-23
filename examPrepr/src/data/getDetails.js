import { get, post, put, del } from "./request.js";

//change endPoints
const ednpoints = {
    dashboard: '/data/characters?sortBy=_createdOn%20desc',
    chars: '/data/characters',
    charsById: '/data/characters/',
    likeChar: '/data/useful',
}

// changeEndpoints here too
export async function getAllChars(){
    return get(ednpoints.dashboard);
}

export async function getCharByID(id){
    return get(ednpoints.charsById + id);
}

export async function createChar({category, imageUrl, description, moreInfo}){
    return post(ednpoints.chars, {category, imageUrl, description, moreInfo});
}

export async function updateChar(id, {category, imageUrl, description, moreInfo}){
    return put(ednpoints.charsById + id, {category, imageUrl, description, moreInfo});
}

export async function delChar(id){
    return await del(ednpoints.charsById + id);
}


export async function likeCharById(characterId){
    return await post(ednpoints.likeChar , {characterId});
}

export async function getLikes(charId){
    const url = ednpoints.likeChar + `?where=characterId%3D%22${charId}%22&distinct=_ownerId&count`
    return await get(url);
}

export async function getUserLike(characterId, userId){
    const url = ednpoints.likeChar + `?where=characterId%3D%22${characterId}%22%20and%20_ownerId%3D%22${userId}%22&count`;
    return await get(url);
}