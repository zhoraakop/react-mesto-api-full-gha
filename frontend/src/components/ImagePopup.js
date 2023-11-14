const ImagePopup = (props) => {
  const card = props.card;
  return (
    <div
      className={`popup ${card.link ? `popup_opened` : ""}`}
      id="popup-image"
    >
      <div className="popup__image">
        <img className="popup__image-content" alt={card.name} src={card.link} />
        <p className="popup__image-title">{card.name}</p>
        <button
          onClick={props.onClose}
          className="popup__close-button popup-image"
          type="button"
          id="popup-image__close-button"
        ></button>
      </div>
    </div>
  );
};

export default ImagePopup;
