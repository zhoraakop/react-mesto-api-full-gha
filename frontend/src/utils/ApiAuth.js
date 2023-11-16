export const URL = "http://zhoraakop.nomoredomainsmonster.ru";

const check = res => {
    if (!res.ok) {
        return Promise.reject(`Ошибка:${res.status}`);
      }
      return res.json();
}

export const authorization = ({ email, password }) => {
  return fetch(`${URL}/api/signin`, {
    method: "POST",
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
  .then((data) => {
    if (data.token) {
      localStorage.setItem("token", data.token);
      return data;
    }
  });
}; 

export const register = ({ email, password }) => {
  return fetch(`${URL}/api/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => check(res));
};

export const getUserToken = (token) => {
  return fetch(`${URL}/api/users/me`, {
    method: "GET",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => check(res));
};
