

class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
    this._credentials = options.credentials;
  }

  _check(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка:${res.status}`);
    }
    return res.json();
  }

  getUserData() {
    return fetch(`${this._url}/api/users/me`, {
      credentials: this._credentials,
      headers: this._headers,
    }).then((res) => this._check(res));
  }

  getInitialCards() {
    return fetch(`${this._url}/api/cards`, {
      credentials: this._credentials,
      headers: this._headers,
    }).then((res) => this._check(res));
  }

  editProfile({ name, about }) {
    return fetch(`${this._url}/api/users/me`, {
      method: "PATCH",
      credentials: this._credentials,
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => this._check(res));
  }

  postCards({ name, link }) {
    return fetch(`${this._url}/api/cards`, {
      method: "POST",
      credentials: this._credentials,
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => this._check(res));
  }

  editAvatar({ avatar }) {
    return fetch(`${this._url}/api/users/me/avatar`, {
      method: "PATCH",
      credentials: this._credentials,
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then((res) => this._check(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/api/cards/${cardId}`, {
      method: "DELETE",
      credentials: this._credentials,
      headers: this._headers,
    }).then((res) => this._check(res));
  }

  likeAdd(cardId) {
    return fetch(`${this._url}/api/cards/${cardId}/likes`, {
      method: "PUT",
      credentials: this._credentials,
      headers: this._headers,
    }).then((res) => this._check(res));
  }

  likeRemove(cardId) {
    return fetch(`${this._url}/api/cards/${cardId}/likes`, {
      method: "DELETE",
      credentials: this._credentials,
      headers: this._headers,
    }).then((res) => this._check(res));
  }
}

const api = new Api({
  baseUrl: "http://zhoraakop.nomoredomainsmonster.ru",
  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${localStorage.getItem('token')}`,
  },
  credentials: 'include',
});

export default api;
