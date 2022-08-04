const { Router } = require('express');
const TimeController = require('../controllers/times-controller');
const { isAuth } = require('../middlewares/is-auth');
const { upload } = require('../config/multer-config');
const { Usuario, UsuarioDAO } = require('../models/Usuario');

const routes = Router();

const timeController = new TimeController();

routes.get('/:id/detalhar', isAuth, timeController.detalhaTime);

routes.get('/cadastro', isAuth, timeController.mostraCadastro);

routes.get('/listagem', isAuth, timeController.listagemTimes);

routes.get('/opcoes',  isAuth, timeController.mostraOpcoes);

routes.get('/:id/agenda', isAuth, timeController.agenda);

routes.get('/:id/convite', isAuth, timeController.mostraConvidar);

routes.post('/:id/convidar', isAuth, timeController.convidaMembro);

routes.post('/:id/agenda/reunioes/criarEvento', isAuth, timeController.criaReuniao);

routes.post('/cadastrar', isAuth, timeController.cadastrar);

module.exports = routes;