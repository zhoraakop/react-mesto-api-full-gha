import PopupWithForm from "./PopupWithForm";

const ConfirmationPopup = ({ isOpen, onClose, onConfirmation, deleteCard }) => {
  function handleSubmit(e) {
    e.preventDefault();
    onConfirmation(deleteCard);
    onClose();
  }

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="trash"
      buttonText="Да"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
};

export default ConfirmationPopup;
