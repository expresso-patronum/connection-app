const { dbcon } = require("../config/db-connection");
const bcrypt = require("bcrypt");
const { UsuarioDAO } = require("../models/Usuario");

class Time {
  constructor(id, nome, descricao, id_empresa, emailresponsavel) {
    this.id = id;
    this.nome = nome;
    this.descricao = descricao;
    this.id_empresa = id_empresa;
    this.emailresponsavel = emailresponsavel;
  }
}

class TimeDAO {
  static async buscaTimesPorUsuario(email) {
    const sql = `select time.nome, time.id, empresa.nome as empresa
        from usuariotime 
        join time on usuariotime.time = time.id 
        join usuario on usuariotime.usuario = usuario.email 
        join empresa on empresa.id = time.id_empresa
        where usuario.email = $1`;
    const result = await dbcon.query(sql, [email]);
    return result.rows;
  }

  static async buscaPeloId(id) {
    const sql = "SELECT time.id, time.nome FROM time where id = $1";
    const result = await dbcon.query(sql, [id]);
    const time = result.rows[0];
    return time;
  }

  static async cadastrar(time, usuario) {
    const sql1 =
      "INSERT INTO public.time(nome, descricao, id_empresa, emailresponsavel) values ($1, $2, $3, $4)";
    const values = [
      time.nome,
      time.descricao,
      time.id_empresa,
      time.emailresponsavel,
    ];
    const sql2 =
      "SELECT time.id FROM time WHERE ID = (SELECT MAX(ID) FROM time)";
    const result1 = await dbcon.query(sql1, values);
    const result2 = await dbcon.query(sql2);
    const ultimoId = result2.rows[0].id;
    const sql3 = "INSERT INTO usuariotime(usuario, time) values ($1, $2)";
    const result3 = await dbcon.query(sql3, [usuario.email, ultimoId]);
  }

  static async buscaEventos(id) {
    const sql = `select evento.email_adm as adm, evento.datahora as datahora, time.nome as time, usuario.nome as usuario 
    from evento 
    join time on evento.time = time.id
    join usuario on evento.email_adm = usuario.email
    where time = $1;`;
    const result = await dbcon.query(sql, [id]);
    const time = result.rows;
    return time;
  }

  static async detalharTime(id) {
    const sql = `select usuario.nome as membros, time.nome as time, usuariotime.created_at as created_at, usuario.imagem as imagem from usuariotime 
    join usuario on usuariotime.usuario = usuario.email 
    join time on usuariotime.time = time.id 
    where time = $1;`;
    const result = await dbcon.query(sql, [id]);
    const time = result.rows;
    return time;
  }

  static async buscaAdm(id) {
    const sql = `select usuario.nome from time 
    join usuario on time.emailresponsavel  = usuario.email 
    where time.id = $1;`;
    const result = await dbcon.query(sql, [id]);
    const adm = result.rows[0];
    return adm;
  }

  static async buscaEmailAdm(id) {
    const sql = "select emailresponsavel from time where time.id = $1;";
    const result = await dbcon.query(sql, [id]);
    const email = result.rows[0];
    return email;
  }

  static async convidaMembro(usuario, time, ativo) {
    const sql =
      "INSERT INTO convite (usuario, time, ativo) VALUES ($1, $2, $3)";
    try {
      const result = await dbcon.query(sql, [usuario, time, ativo]);
      return result;
    } catch (error) {
      console.log("Não foi possível cadastrar!");
      console.log({ error });
      return error;
    }
  }
  //const eventoNovo = await TimeDAO.novoEvento(timeId, adm, dataNova);
  static async novoEvento(adm, timeId, dataNova) {
    const sql =
      "INSERT INTO evento(email_adm, time, datahora) values ($1, $2, $3)";
    try {
      const result = await dbcon.query(sql, [adm.toString(), timeId, dataNova]);
      return result;
    } catch (error) {
      console.log("Não foi possível cadastrar!");
      console.log({ error });
      return error;
    }
  }
}

module.exports = {
  Time,
  TimeDAO,
};
