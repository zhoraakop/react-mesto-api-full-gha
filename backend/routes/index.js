require('dotenv').config();

const router = require('express').Router();

const auth = require('../middlewares/auth');

const { login, createUser } = require('../controllers/users');
const users = require('./users');
const cards = require('./cards');
const { validationCreateUser, validationLog } = require('../middlewares/validation');
const NotFoundError = require('../errors/NotFoundError');
// 0|app    | Error: Сервер сейчас упадёт
// 0|app    |     at Timeout._onTimeout (/home/zhoraakop/react-mesto-api-f
// ull-gha/backend/routes/index.js:15:11)
// 0|app    |     at listOnTimeout (node:internal/timers:569:17)
// 0|app    |     at process.processTimers (node:internal/timers:512:7)
// PM2      | App [app:0] exited with code [1] via signal [SIGINT]
// PM2      | App [app:0] starting in -fork mode-
// PM2      | App [app:0] online
// 0|app    | CONNECTED TO MONGODB
router.get((process.env.API ? (`/${process.env.API}/crash-test`) : ('/api/crash-test')), () => {
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
