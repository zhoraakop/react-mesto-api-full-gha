import { Outlet } from "react-router-dom";
import logo from "../images/logo.svg";
import Footer from "./Footer";
import { Route, Link, Routes } from "react-router-dom";
import Menu from "../images/Menu-line.svg";
import Close from "../images/Close-Icon.svg";

const Header = ({ loggedIn, onLogout, isMenu, handleMenuOpen, token }) => {
  return (
    <div className="page">
      {isMenu && token !== null ? (
        <div className="header__menu header__menu-active">
          <p className="email">{loggedIn}</p>
          <Link to="signin" className="header__link" onClick={onLogout}>
            Выйти
          </Link>
        </div>
      ) : null}
      <header className="header">
        <img className="logo" src={logo} alt="Место" />
        <Routes>
          <Route
            path="/signup"
            element={
              <Link className="header__link" to="/signin">
                Войти
              </Link>
            }
          />
          <Route
            path="/signin"
            element={
              <Link className="header__link" to="/signup">
                Регистрация
              </Link>
            }
          />
          <Route
            path="/"
            element={
              <p className="email">
                {loggedIn}
                <button className="header__link" onClick={onLogout}>
                  Выйти
                </button>
              </p>
            }
          />
        </Routes>
        {token !== null ? (
          !loggedIn ? null : !isMenu ? (
            <div className="header__menu-logo">
              <img
                src={Menu}
                className="header__menu-icon"
                onClick={handleMenuOpen}
              />
              <img
                src={Menu}
                className="header__menu-icon"
                onClick={handleMenuOpen}
              />
              <img
                src={Menu}
                className="header__menu-icon"
                onClick={handleMenuOpen}
              />
            </div>
          ) : (
            <img
              src={Close}
              className="header__menu-close"
              onClick={handleMenuOpen}
            />
          )
        ) : null}
      </header>

      <Outlet />
      <Footer />
    </div>
  );
};

export default Header;
