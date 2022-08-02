const { Router } = require('express');
const EmpresaController = require('../controllers/empresas-controller');
const { isAuth } = require('../middlewares/is-auth');
const { upload } = require('../config/multer-config');
const { Usuario } = require('../models/Usuario');

const routes = Router();

const empresaController = new EmpresaController();
routes.get('/empresas',  isAuth, empresaController.empresas);
routes.get('/empresasPorUsuario',  isAuth, empresaController.empresasPorUsuario);
routes.get('/cadastro',  isAuth, empresaController.mostraCadastro);

routes.post('/cadastrar', isAuth, empresaController.cadastrar);

module.exports = routes;