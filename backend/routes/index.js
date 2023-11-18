require('dotenv').config();

const router = require('express').Router();

const auth = require('../middlewares/auth');

const { API } = process.env || '';

const { login, createUser } = require('../controllers/users');
const users = require('./users');
const cards = require('./cards');
const { validationCreateUser, validationLog } = require('../middlewares/validation');
const NotFoundError = require('../errors/NotFoundError');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post(`/${API}signup`, validationCreateUser, createUser);
router.post(`/${API}signin`, validationLog, login);

router.use(auth);
router.use(`/${API}users`, users);
router.use(`/${API}cards`, cards);
router.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
