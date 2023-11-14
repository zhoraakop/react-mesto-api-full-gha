const {
  HTTP_STATUS_OK,
  HTTP_STATUS_CREATED,
} = require('http2').constants;

const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const cardModel = require('../models/card');

const getAllCards = (req, res, next) => {
  cardModel.find({}).then((cards) => {
    res.status(HTTP_STATUS_OK).send(cards);
  }).catch((err) => (
    next(err)
  ));
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  cardModel.create({ name, link, owner })
    .then((card) => {
      res.status(HTTP_STATUS_CREATED).send(card);
    }).catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Передан некорректные данные'));
      }
      return next(err);
    });
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const { _id: userId } = req.user;

  cardModel.findById(cardId)
    .orFail(() => {
      throw new Error('NotFoundError');
    })
    .then((card) => {
      if (userId !== card.owner.toString()) {
        throw new ForbiddenError('Можно удалять только собственные посты');
      }
      return cardModel.findByIdAndRemove(cardId)
        .then(() => res.status(HTTP_STATUS_OK).send({ message: 'Карточка удалена' }));
    }).catch((err) => {
      if (err.message === 'NotFoundError') {
        return next(new NotFoundError('Карточка не найдена'));
      }
      if (err.name === 'CastError') {
        return next(new BadRequestError('Передан некорректные данные'));
      }
      return next(err);
    });
};

const putLikeCard = (req, res, next) => {
  cardModel.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new Error('NotFoundError');
    })
    .then((newCard) => {
      res.status(HTTP_STATUS_OK).send(newCard);
    }).catch((err) => {
      if (err.message === 'NotFoundError') {
        return next(new NotFoundError('Карточка не найдена'));
      }
      if (err.name === 'CastError') {
        return next(new BadRequestError('Передан некорректные данные'));
      }
      return next(err);
    });
};

const deleteLikeCard = (req, res, next) => {
  cardModel.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new Error('NotFoundError');
    })
    .then((newCard) => res.status(HTTP_STATUS_OK).send(newCard))
    .catch((err) => {
      if (err.message === 'NotFoundError') {
        return next(new NotFoundError('Карточка не найдена'));
      }
      if (err.name === 'CastError') {
        return next(new BadRequestError('Передан некорректные данные'));
      }
      return next(err);
    });
};

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  putLikeCard,
  deleteLikeCard,
};
