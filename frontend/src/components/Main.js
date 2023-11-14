import React from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

const Main = ({
  onCardClick,
  onAddPlace,
  onEditAvatar,
  onEditProfile,
  cards,
  onCardLike,
  onCardDelete,
}) => {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <img
          className="profile__avatar"
          src={currentUser.avatar}
          alt="Жак-Ив Кусто"
          name="profileAvatar"
        />
        <button
          className="profile__avatar-button"
          onClick={onEditAvatar}
        ></button>
        <div className="profile-info">
          <h1 className="profile-info__title">{currentUser.name}</h1>
          <button
            className="profile-info__button"
            type="button"
            onClick={onEditProfile}
          ></button>
          <p className="profile-info__subtitle">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="elements">
        {cards.map((card) => (
          <Card
            onCardLike={onCardLike}
            currentUser={currentUser}
            card={card}
            key={card._id}
            onCardClick={onCardClick}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
};

export default Main;
