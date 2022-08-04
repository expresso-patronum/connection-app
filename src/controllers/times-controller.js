const { compareSync } = require("bcrypt");
const { Time, TimeDAO } = require("../models/Time");
const { Empresa, EmpresaDAO } = require("../models/Empresa");
const { UsuarioDAO } = require("../models/Usuario");
class TimesController {
  async mostraCadastro(req, res) {

   let usuario = req.session.usuario
    const empresas = await EmpresaDAO.buscaEmpresasPorUsuario(usuario);
    return res.render("times/cadastro", {
      usuario: req.session.usuario,
      empresas,
    });
  }

  async listagemTimes(req, res) {
    const email = req.session.usuario.email;
    const times = await TimeDAO.buscaTimesPorUsuario(email);
    return res.render("times/listagem", {
      usuario: req.session.usuario,
      times,
    });
  }

  async mostraOpcoes(req, res) {
    return res.render("times/opcoes", { usuario: req.session.usuario });
  }

  async cadastrar(req, res) {
    const usuario = req.session.usuario;
    const timeBody = req.body;
    const time = new Time(
      null,
      timeBody.nome,
      timeBody.descricao,
      timeBody.empresas,
      req.session.usuario.email
    );
    await TimeDAO.cadastrar(time, usuario);
    return res.redirect("/times/opcoes");
  }

  async agenda(req, res) {
    const timeId = req.params.id; // id do time
    const usuario = req.session.usuario; // usuario da sessão
    const time = await TimeDAO.buscaPeloId(timeId);
    const eventos = await TimeDAO.buscaEventos(timeId); // busca eventos e organizador
    return res.render("times/agenda", {
      time,
      usuario,
      eventos,
    });
  }

  async detalhaTime(req, res) {
    const timeId = req.params.id;
    const usuario = req.session.usuario.email;
    const time = await TimeDAO.buscaPeloId(timeId);
    const adm = await TimeDAO.buscaAdm(timeId);
    const emailAdm = await TimeDAO.buscaEmailAdm(timeId);
    const informacoes = await TimeDAO.detalharTime(timeId);
    return res.render("times/detalhar", {
      informacoes,
      usuario,
      adm,
      emailAdm,
      time
    });
  }

   async mostraConvidar(req, res) {
    const timeId = req.params.id;
    const usuario = req.session.usuario.email;
    const time = await TimeDAO.buscaPeloId(timeId);
    return res.render('times/convite', { usuario, time });
}

   async convidaMembro(req, res) {
    const id = req.params.id;
    const email = req.body.email;
    const ativo = true;
    const time = await TimeDAO.buscaPeloId(id);
    if (time) {
        const usuario = await UsuarioDAO.buscaPeloEmail2(email);
    if(usuario) {
        const usuariotime = await UsuarioDAO.buscaPorMembro(id, email);

        if(usuariotime) {
            return res.render('erro', { erro: 'Esse usuário já participa do time.'});
        } else {
     const convite = await TimeDAO.convidaMembro(email, id, ativo);
     res.redirect('/times/opcoes');
        }
    }  else {
        return res.render('erro', { erro: 'Usuário não encontrado.' });
    }
} else {
    res.redirect('/times/opcoes');
}
   }
  async criaReuniao(req, res) {
    //abre o modal
    const timeId = req.params.id;
    const data = req.body.data;
    const hora = req.body.hora.toString();
    const adm = req.body.adm;

    let dia = parseInt(data.slice(0, 2));
    let mes = parseInt(data.slice(3, 5));
    let ano = parseInt(data.slice(6, 12));
    let horaNova = parseInt(data.slice(0, 2));
    let minutosNovo = parseInt(data.slice(3, 5));
    let dataNova = new Date(ano, mes, dia, horaNova, minutosNovo, 0, 0);

    const usuario = req.session.usuario;
    const time = await TimeDAO.buscaPeloId(timeId);
    const agenda = await TimeDAO.buscaEventos(timeId);
    const eventos = await TimeDAO.buscaEventos(timeId)
    const eventoNovo = await TimeDAO.novoEvento(adm, timeId, dataNova);
    return res.redirect("/times/opcoes");
  }
}

module.exports = TimesController;
