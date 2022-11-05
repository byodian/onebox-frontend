const ACCESS_TOKEN = 'Access-Token';
const CURRENT_USER = 'Current-User';
const IS_LOGIN = 'isLogIn';

export function getStorageToken() {
  return JSON.parse(window.localStorage.getItem(ACCESS_TOKEN));
}

export function generateStorageToken(token) {
  window.localStorage.setItem(ACCESS_TOKEN, JSON.stringify(token));
}

export function getStorageUser() {
  return JSON.parse(window.localStorage.getItem(CURRENT_USER));
}

export function generateStorageUser(user) {
  window.localStorage.setItem(CURRENT_USER, JSON.stringify(user));
}

export function getStorageLogIn() {
  return JSON.parse(window.localStorage.getItem(IS_LOGIN));
}

export function generateStorageLogIn(isLogInFlag) {
  window.localStorage.setItem(IS_LOGIN, JSON.stringify(isLogInFlag));
}

export function clearStorage() {
  window.localStorage.clear();
}
