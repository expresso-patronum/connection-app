const { dbcon } = require("../config/db-connection");
const bcrypt = require("bcrypt");

class Usuario {
  constructor(id, nome, email, senha, imagem, created_at) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.imagem = imagem;
    this.created_at = created_at;
  }
}

class UsuarioDAO {
  static async buscaPeloEmail(email) {
    const sql = "SELECT * FROM public.usuario where public.usuario.email = $1";
    const result = await dbcon.query(sql, [email]);
    const usuario = result.rows[0];
    return usuario;
  }

  static async buscaPeloEmail2(email) {
    const sql =
      "SELECT email FROM public.usuario where public.usuario.email = $1";
    const result = await dbcon.query(sql, [email]);
    const usuario = result.rows[0];
    return usuario;
  }

  static async buscaPeloId(id) {
    const sql = "SELECT * FROM public.usuario where public.usuario.id = $1";
    const result = await dbcon.query(sql, [id]);
    const usuario = result.rows[0];
    return usuario;
  }

  static async cadastrar(usuario) {
    const sql =
      "INSERT INTO public.usuario (nome, email, senha, imagem) VALUES ($1, $2, $3, $4);";
    const senha = bcrypt.hashSync(usuario.senha, 10);
    const values = [usuario.nome, usuario.email, senha, usuario.imagem];

    try {
      await dbcon.query(sql, values);
    } catch (error) {
      console.log({ error });
    }
  }

  static async buscaPorMembro(idTime, email) {
    const sql = "SELECT * FROM usuariotime WHERE time = $1 AND usuario = $2";
    const result = await dbcon.query(sql, [idTime, email]);
    return result.rows[0];
  }

  static async buscaNotificacoes(usuario) {
    const sql =
      "select convite.id as id, time.nome as time, convite.created_at as created_at from convite join time on time.id=convite.time where usuario= $1 and ativo = true";
    const result = await dbcon.query(sql, [usuario.email]);
    let notificacoes = [];
    for (let i = 0; i < result.rows.length; i++) {
      notificacoes.push(result.rows[i]);
    }
    return notificacoes;
  }

  static async aceitarNotificacao(idConvite, usuario) {
    try {
      const sql1 = "select time from convite where id= $1";
      const result1 = await dbcon.query(sql1, [idConvite]);
      let timeDoConvite = result1.rows[0];
      const sql2 = "insert into usuariotime(usuario, time) values($1, $2);";
      const result2 = await dbcon.query(sql2, [usuario, timeDoConvite.time]);
      const sql3 = "UPDATE convite SET ativo= false WHERE id= $1";
      const result3 = await dbcon.query(sql3, [idConvite]);
      return result3;
    } catch (error) {
      console.log({ error });
      return error;
    }
  }

  static async negarNotificacao(idConvite, usuario) {
    try {
      const sql3 = "UPDATE convite SET ativo= false WHERE id= $1";
      const result3 = await dbcon.query(sql3, [idConvite]);
      return result3;
    } catch (error) {
      return error;
    }
  }
}
module.exports = {
  Usuario,
  UsuarioDAO,
};
