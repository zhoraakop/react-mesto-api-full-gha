import React, { useState } from "react";

const Login = ({ onLogin }) => {
  const [userData, setUserData] = React.useState({});

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!userData) {
      return;
    }
    onLogin(userData);
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  }

  return (
    <div className="sign-container">
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="form__title">Вход</h2>
        <input
          id="email"
          type="text"
          className="form__input"
          placeholder="Email"
          name="email"
          required
          minLength="2"
          maxLength="40"
          value={userData.email || ""}
          onChange={handleChange}
        />
        <input
          id="password"
          type="password"
          className="form__input"
          placeholder="Пароль"
          name="password"
          required
          minLength="2"
          maxLength="40"
          value={userData.password || ""}
          onChange={handleChange}
        />
        <button className="form__button" type="submit">
          Войти
        </button>
      </form>
    </div>
  );
};

export default Login;
