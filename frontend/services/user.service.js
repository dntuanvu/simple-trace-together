import { BehaviorSubject } from "rxjs";
import getConfig from "next/config";
import Router from "next/router";

import { fetchWrapper } from "helpers";

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/users`;
const userSubject = new BehaviorSubject(
  process.browser && JSON.parse(localStorage.getItem("user"))
);

export const userService = {
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value;
  },
  login,
  logout,
  register,
  getAll,
  getById,
  update,
  delete: _delete,
};

function login(username, password) {
  //return fetchWrapper.post(`${baseUrl}/authenticate`, { username, password })
  return fetchWrapper
    .post(`http://localhost:8080/auth/login`, { username, password })
    .then((response) => {
      //console.log("login, user=" + JSON.stringify(response));
      // publish user to subscribers and store in local storage to stay logged in between page refreshes
      const user = response;
      //console.log("login, user=" + JSON.parse(user));
      userSubject.next(user);
      localStorage.setItem("user", JSON.stringify(user));
      //localStorage.setItem("access_token", user.access_token);
      return user;
    });
}

function logout() {
  // remove user from local storage, publish null to user subscribers and redirect to login page
  localStorage.removeItem("user");
  userSubject.next(null);
  Router.push("/account/login");
}

function register(user) {
  //return fetchWrapper.post(`${baseUrl}/register`, user);
  console.log(
    "register, firstName=" +
      user.firstName +
      "; lastName=" +
      user.lastName +
      "; role=" +
      user.role
  );
  return fetchWrapper.post(`http://localhost:8080/auth/register`, user);
}

function getAll() {
  return fetchWrapper.get(`http://localhost:8080/users`);
}

function getById(id) {
  return fetchWrapper.get(`${baseUrl}/${id}`);
}

function update(id, params) {
  return fetchWrapper.put(`${baseUrl}/${id}`, params).then((x) => {
    // update stored user if the logged in user updated their own record
    if (id === userSubject.value.id) {
      // update local storage
      const user = { ...userSubject.value, ...params };
      localStorage.setItem("user", JSON.stringify(user));

      // publish updated user to subscribers
      userSubject.next(user);
    }
    return x;
  });
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
  //return fetchWrapper.delete(`${baseUrl}/${id}`);
  return fetchWrapper.delete(`http://localhost:8080/incident/${id}`);
}
