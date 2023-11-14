import React from "react";
import Cool from "../images/Cool.svg";
import Error from "../images/Error.svg";

const InfoTooltip = (props) => {
  return (
    <div
      className={`popup ${props.isOpen ? "popup_opened" : ""}`}
      id={`popup-${props.name}`}
    >
      <div className={`popup__content`}>
        <button
          className={`popup__close-button popup-${props.name}`}
          id={`popup-${props.name}__close-button`}
          type="button"
          onClick={props.onClose}
        />
        <img
          className="popup__answer"
          src={props.loggedIn ? Cool : Error}
          alt=""
        />
        <h2 className="popup__info">{props.title}</h2>
      </div>
    </div>
  );
};
export default InfoTooltip;
