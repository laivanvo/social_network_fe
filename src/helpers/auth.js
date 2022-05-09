import Cookies from 'js-cookie'

const tokenKey = 'user_token'

export function getToken() {
  return Cookies.get(tokenKey)
}

export function setToken(token) {
  return Cookies.set(tokenKey, 'Bearer ' + token)
}

export function removeToken() {
  return Cookies.remove(tokenKey)
}
