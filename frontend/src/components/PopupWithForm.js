const PopupWithForm = (props) => {
  return (
    <div
      className={`popup ${props.isOpen ? `popup_opened` : ""}`}
      id={`popup-${props.name}`}
    >
      <div className="popup__content">
        <h2 className="popup__title">{props.title}</h2>
        <form
          className="popup__form"
          id={`form-${props.name}`}
          name={`form-${props.name}`}
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button
            type="submit"
            className="popup__button"
            id={`popup__button-${props.name}`}
          >
            {props.buttonText}
          </button>
        </form>
        <button
          className={`popup__close-button popup-${props.name}`}
          id={`popup-${props.name}__close-button`}
          type="button"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
};

export default PopupWithForm;
