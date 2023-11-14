import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = ({ onRegister, onInfoTooltip }) => {
  const [userData, setUserData] = useState({});

  function handleSubmit(e) {
    e.preventDefault();
    if (!userData) {
      return;
    }
    onRegister(userData);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  }

  return (
    <div className="sign-container">
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="form__title">Регистрация</h2>
        <input
          id="email"
          type="email"
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
        <button className="form__button" type="submit" onClick={onInfoTooltip}>
          Зарегистрироваться
        </button>
        <div className="form__link">
          <Link className="form__link-login" to="/signin">
            Уже зарегистрированы? Войти
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
