const Card = ({ card, onCardClick, currentUser, onCardLike, onCardDelete }) => {
  function handleCardClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }
  console.log("card", card);
  const isOwn = card.owner === currentUser._id;
  console.log("isown", isOwn);
  console.log("card.owner._id", card.owner);
  console.log("currentUser._id", currentUser._id);
  
  const isLiked = card.likes.some((i) =>  i === currentUser._id);
  console.log("isliked", isLiked);
  const cardLikeButtonClassName = `element__like ${
    isLiked && "element__like_active"
  }`;

  return (
    <div className="element">
      <img
        onClick={handleCardClick}
        className="element__image"
        src={card.link}
        alt={card.name}
      />
      <h2 className="element__title">{card.name}</h2>
      <div className="element__container">
        <button
          type="button"
          onClick={handleLikeClick}
          className={cardLikeButtonClassName}
        ></button>
        <span className="element__like-counter">{card.likes.length}</span>
      </div>
      {isOwn && (
        <button
          type="button"
          onClick={handleDeleteClick}
          className="element__trash"
        ></button>
      )}
    </div>
  );
};

export default Card;
