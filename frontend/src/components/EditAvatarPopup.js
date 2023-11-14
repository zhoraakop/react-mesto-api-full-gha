import PopupWithForm from "./PopupWithForm";
import React, { useRef } from "react";

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar }) => {
  const link = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: link.current.value,
    });
  }

  React.useEffect(() => {
    link.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      children={
        <>
          <input
            ref={link}
            id="link"
            type="url"
            className="popup__input"
            name="newProfileAvatar"
            placeholder="Введите ссылку на новый аватар."
            required
          />
          <span
            className="link-error popup__input-error"
            id="link-error"
          ></span>
        </>
      }
    />
  );
};

export default EditAvatarPopup;
