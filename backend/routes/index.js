require('dotenv').config();

const router = require('express').Router();

const auth = require('../middlewares/auth');

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

router.post((process.env.API ? (`/${process.env.API}/signup`) : ('/signup')), validationCreateUser, createUser);
router.post((process.env.API ? (`/${process.env.API}/signin`) : ('/signin')), validationLog, login);

router.use(auth);
router.use((process.env.API ? (`/${process.env.API}/users`) : ('/users')), users);
router.use((process.env.API ? (`/${process.env.API}/cards`) : ('/cards')), cards);
router.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
