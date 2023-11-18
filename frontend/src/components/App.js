import React, { useEffect, useState } from "react";
import Header from "./Header";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { Routes, Route } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import * as ApiAuth from "../utils/ApiAuth";
import ProtectedRoute from "./ProtectedRoute";
import { getToken, removeToken, setToken } from "../utils/Token";
import InfoTooltip from "./InfoTooltip";
import ConfirmationPopup from "./ConfirmationPopup";

function App() {
  const [selectedCard, setSelectedCard] = useState({
    name: "",
    link: "",
  });
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmationPopup, setIsConfirmationPopup] = useState(false);
  const [isInfoTooltipPopup, setIsInfoTooltipPopup] = useState(false);
  const [loggedIn, setLoggedIn] = useState(null);
  const [email, setEmail] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [isMenu, setIsMenu] = useState(false);
  const [isCard, setIsCard] = useState({});

  useEffect(() => {
    api
      .getUserData()
      .then((res) => setCurrentUser(res))
      .catch((err) => {
        console.error(err);
      });
    api
      .getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [isRegister]);

  const token = getToken();
  useEffect(() => {
    ApiAuth.getUserToken(token)
      .then((res) => {
        if (token) {
          setEmail(res.email);
          setLoggedIn({ ...res });
          setIsRegister(true);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [isRegister]);

  const handleAddPlaceSubmit = async (card) => {
    await api
      .postCards(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleUpdateUser = async (info) => {
    await api
      .editProfile(info)
      .then((newInfo) => {
        setCurrentUser(newInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleUpdateAvatar = async (src) => {
    await api
      .editAvatar(src)
      .then((newSrc) => {
        setCurrentUser(newSrc);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleConfirmation = async (card) => {
    await api
      .deleteCard(card._id)
      .then(() => {
        setCards((oldCard) =>
          oldCard.filter((someone) => someone._id !== card._id)
        );
      })
      .catch((err) => {
        console.error(err);
      });
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    if (!isLiked) {
      api
        .likeAdd(card._id)
        .then((newCard) => {
          setCards((state) => 
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      api
        .likeRemove(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  const handleCardDeleteClick = (card) => {
    setIsConfirmationPopup(true);
    setIsCard(card);
  };

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleInfoTooltipClick() {
    setIsInfoTooltipPopup(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(selectedCard) {
    setSelectedCard(selectedCard);
  }

  function handleMenuOpen() {
    setIsMenu(!isMenu);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setSelectedCard({ name: "", link: "" });
    setIsInfoTooltipPopup(false);
    setIsConfirmationPopup(false);
  }

  function cbLogin(dataLogin) {
    ApiAuth.authorization(dataLogin)
      .then((dataLogin) => {
        setToken(dataLogin.token);
        setLoggedIn(dataLogin);
        setIsRegister(true);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function cbRegister(dataRegister) {
    ApiAuth.register(dataRegister)
      .then((dataRegister) => {
        setLoggedIn(dataRegister);
        setEmail(dataRegister.email);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function cbLogout() {
    removeToken();
    setEmail("");
    setLoggedIn(null);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route
            path="/"
            element={
              <Header
                loggedIn={email}
                onLogout={cbLogout}
                isMenu={isMenu}
                handleMenuOpen={handleMenuOpen}
                token={token}
              />
            }
          >
            <Route
              index
              element={
                <ProtectedRoute user={loggedIn} isRegister={isRegister}>
                  <Main
                    onEditProfile={handleEditProfileClick}
                    onEditAvatar={handleEditAvatarClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardClick={handleCardClick}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDeleteClick}
                  />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/signup"
              element={
                <ProtectedRoute
                  user={loggedIn}
                  onlyUnAuth
                  isRegister={isRegister}
                >
                  <Register
                    onRegister={cbRegister}
                    onInfoTooltip={handleInfoTooltipClick}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/signin"
              element={
                <ProtectedRoute
                  user={loggedIn}
                  onlyUnAuth
                  isRegister={isRegister}
                >
                  <Login onLogin={cbLogin} />{" "}
                </ProtectedRoute>
              }
            ></Route>
          </Route>
        </Routes>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <InfoTooltip
          isOpen={isInfoTooltipPopup}
          onClose={closeAllPopups}
          loggedIn={loggedIn}
          name="infoTooltip"
          title={
            !loggedIn
              ? "Что-то пошло не так! Попробуйте ещё раз."
              : "Вы успешно зарегистрировались!"
          }
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <ConfirmationPopup
          isOpen={isConfirmationPopup}
          onClose={closeAllPopups}
          onConfirmation={handleConfirmation}
          deleteCard={isCard}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
