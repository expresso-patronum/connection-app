const { Router } = require("express");
const UsuarioController = require("../controllers/usuarios-controller");
const { isAuth } = require("../middlewares/is-auth");
const { upload } = require("../config/multer-config");

const routes = Router();

const usuarioController = new UsuarioController();

routes.get("/notificacoes", isAuth, usuarioController.notificacoes);

routes.get("/cadastro", usuarioController.mostraCadastro);

routes.get("/login", usuarioController.mostraLogin);

routes.post("/logar", usuarioController.login);

routes.get("/logout", isAuth, usuarioController.logout);

routes.post("/cadastrar", upload.single("imagem"), usuarioController.cadastrar);

routes.post(
  "/notificacoes/aceitar",
  isAuth,
  usuarioController.aceitarNotificacao
);

routes.post("/notificacoes/negar", isAuth, usuarioController.negarNotificacao);
module.exports = routes;
