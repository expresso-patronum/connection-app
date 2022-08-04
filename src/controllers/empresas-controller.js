const { compareSync } = require("bcrypt");
const { Empresa, EmpresaDAO } = require("../models/Empresa");
const { Usuario, UsuarioDAO } = require("../models/Usuario");

class EmpresasController {
  async mostraCadastro(req, res) {
    return res.render("empresas/cadastro", { usuario: req.session.usuario });
  }

  async cadastrar(req, res) {
    const empresaBody = req.body;
    const empresa = new Empresa(
      null,
      empresaBody.nome,
      req.session.usuario.email
    );
    await EmpresaDAO.cadastrar(empresa);
    return res.redirect("/empresas/opcoes");
  }

  async mostraOpcoesParaEmpresas(req, res) {
    const empresasAll = await EmpresaDAO.buscaAllEmpresas();
    return res.render("empresas/opcoes", { empresasAll, usuario: req.session.usuario });
  }

  async empresaTime(req, res) {
    const id = req.params.id;
    const timesEmpresa = await EmpresaDAO.buscaTimesEmpresa(id);
    return res.render("empresas/empresaTime", { timesEmpresa, usuario: req.session.usuario });
  }
  async mostraEmpresas(req, res) {
    const usuario = req.session.usuario;
    const empresasAll = await EmpresaDAO.buscaAllEmpresas();
    const empresasUsuario = await EmpresaDAO.buscaEmpresasPorUsuario(usuario);
    return res.render("empresas/usuario", {
      usuario: req.session.usuario,
      empresasUsuario,
      empresasAll
    });
  }
}

module.exports = EmpresasController;
