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

router.post('/api/signup', validationCreateUser, createUser);
router.post('/api/signin', validationLog, login);

router.use(auth);
router.use('/api/users', users);
router.use('/api/cards', cards);
router.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
