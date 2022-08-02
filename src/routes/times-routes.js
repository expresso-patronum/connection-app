const { Router } = require('express');
const TimeController = require('../controllers/times-controller');
const { isAuth } = require('../middlewares/is-auth');
const { upload } = require('../config/multer-config');
const { Usuario } = require('../models/Usuario');

const routes = Router();

const timeController = new TimeController();

routes.get('/cadastro',  isAuth, timeController.mostraCadastro);

routes.post('/cadastrar', isAuth, timeController.cadastrar);

module.exports = routes;