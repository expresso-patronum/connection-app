const { Router } = require('express');
const UsuarioController = require('../controllers/usuario-controller');
const { isAuth } = require('../middlewares/is-auth');
const { upload } = require('../config/multer-config');
const { Usuario } = require('../models/Usuario');

const routes = Router();

const usuarioController = new UsuarioController();

routes.get('/perfil', isAuth, usuarioController.detalhar);

routes.get('/listagem', async (req, res) => {
    const lista = await Usuario.findAll();
    return res.send(JSON.stringify(lista, null, 2));
});

routes.get('/cadastro',  usuarioController.mostraCadastro);

routes.get('/login',  usuarioController.mostraLogin);

routes.post('/logar', usuarioController.login);

routes.post('/cadastrar', upload.single('imagem'), usuarioController.cadastrar);

module.exports = routes;