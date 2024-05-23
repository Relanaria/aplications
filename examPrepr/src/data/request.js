import { clearUserData, getUserData } from "../util.js";

const host = `http://localhost:3030`;

export async function request(method, url, data) {
  const options = {
    method,
    headers: {},
  };

  const userData = getUserData(); // user deppends on how we set it!

  if (userData) {
    options.headers["X-Authorization"] = userData.accessToken;
  }

  if (data != undefined) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(data);
  }

  try {
    const res = await fetch(host + url, options);

    if (!res.ok) {
      const err = await res.json();

      if (userData && err.code == 403) {
        //accesseToken has expired
        clearUserData();
      }
      throw new Error(err.message);
    }

    if (res.status == 204) {
      // when logout no res returned
      return res;
    }
    return res.json();
  } catch (error) {
    // TODO if another error is needed
    alert(error.message);
    throw error;
  }
}

export const get = (url) => request("GET", url);
export const put = (url, data) => request("PUT", url, data);
export const post = (url, data) => request("POST", url, data);
export const patch = (url, data) => request("PATCH", url, data);
export const del = (url) => request("DELETE", url);
