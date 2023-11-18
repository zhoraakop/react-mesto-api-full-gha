export const URL = "http://zhoraakop.nomoredomainsmonster.ru/api";

const check = res => {
    if (!res.ok) {
        return Promise.reject(`Ошибка:${res.status}`);
      }
      return res.json();
}

export const authorization = ({ email, password }) => {
  return fetch(`${URL}/signin`, {
    method: "POST",
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
  .then(check);
}; 

export const register = ({ email, password }) => {
  return fetch(`${URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => check(res));
};

export const getUserToken = (token) => {
  return fetch(`${URL}/users/me`, {
    method: "GET",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(check);
};
