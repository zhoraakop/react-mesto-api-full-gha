import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="info"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      children={
        <>
          <input
            id="nameProfile"
            type="text"
            className="popup__input"
            placeholder="имя"
            name="nameProfile"
            required
            minLength="2"
            maxLength="40"
            value={name ? name : ""}
            onChange={handleChangeName}
          />
          <span
            className="nameProfile-error popup__input-error"
            id="nameProfile-error"
          ></span>
          <input
            id="information"
            type="text"
            className="popup__input"
            name="information"
            placeholder="информация"
            required
            minLength="2"
            maxLength="200"
            value={description ? description : ""}
            onChange={handleChangeDescription}
          />
          <span
            className="information-error popup__input-error"
            id="information-error"
          ></span>
        </>
      }
    />
  );
};

export default EditProfilePopup;
