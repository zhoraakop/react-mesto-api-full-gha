import PopupWithForm from "./PopupWithForm";
import React from "react";

const AddPlacePopup = ({ isOpen, onClose, onAddPlace }) => {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: name,
      link: link,
    });
  }

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Новое место"
      name="add"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      children={
        <>
          <input
            id="name-card"
            type="text"
            className="popup__input"
            placeholder="Название"
            name="cardName"
            required
            minLength="2"
            maxLength="30"
            value={name}
            onChange={handleChangeName}
          />
          <span
            className="name-card-error popup__input-error"
            id="name-card-error"
          ></span>
          <input
            id="url"
            type="url"
            className="popup__input"
            name="linkCard"
            placeholder="Ссылка на картинку"
            required
            value={link}
            onChange={handleChangeLink}
          />
          <span className="url-error popup__input-error" id="url-error"></span>
        </>
      }
    />
  );
};

export default AddPlacePopup;
