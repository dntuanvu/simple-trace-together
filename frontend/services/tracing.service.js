import { BehaviorSubject } from "rxjs";
import getConfig from "next/config";
import Router from "next/router";

import { fetchWrapper } from "helpers";

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/users`;
const userSubject = new BehaviorSubject(
  process.browser && JSON.parse(localStorage.getItem("user"))
);

export const tracingService = {
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value;
  },
  getAll,
  getById,

  createTracing,
  getAllByUser,
};

function createTracing(user) {
  return fetchWrapper.post(`http://localhost:8080/tracings/raise`, user);
}

function getAll() {
  return fetchWrapper.get(`http://localhost:8080/tracings`);
}

function getAllByUser() {
  return fetchWrapper.get(`http://localhost:8080/tracings/user`);
}

function getById(id) {
  return fetchWrapper.get(`http://localhost:8080/tracings/${id}`);
}