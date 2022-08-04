const { dbcon } = require("../config/db-connection");
const bcrypt = require("bcrypt");

class Empresa {
  constructor(id, nome, chefe) {
    this.id = id;
    this.nome = nome;
    this.chefe = chefe;
  }
}

class EmpresaDAO {
  static async buscaEmpresasPorUsuario(email) {
    //Tivemos que fazer 3 selects diferentes para pegar tudo

    const sql1 = "select id, nome from empresa where chefe= $1";
    const result1 = await dbcon.query(sql1, [email.email]);
    const sql2 =
      "select empresa.id, empresa.nome from empresa join time on empresa.id = time.id_empresa where time.emailresponsavel= $1";
    const result2 = await dbcon.query(sql2, [email.email]);
    const sql3 =
      "select empresa.id, empresa.nome from empresa join time on empresa.id = time.id_empresa join usuariotime on usuariotime.time= time.id where usuariotime.usuario= $1";
    const result3 = await dbcon.query(sql3, [email.email]);

    let vetorComTodos = [];
    let empresasDoUsuario = [];
    let empresasDoUsuarioTeste = [];
    for (let i = 0; i < result1.rows.length; i++) {
      vetorComTodos.push(result1.rows[i]);
    }
    for (let i = 0; i < result2.rows.length; i++) {
      vetorComTodos.push(result2.rows[i]);
    }
    for (let i = 0; i < result3.rows.length; i++) {
      vetorComTodos.push(result3.rows[i]);
    }

    for (let i = 0; i < vetorComTodos.length; i++) {
      if (empresasDoUsuarioTeste.indexOf(vetorComTodos[i].nome) == -1) {
        let obj= new Object()
        obj.id= vetorComTodos[i].id
        obj.nome= vetorComTodos[i].nome
        empresasDoUsuarioTeste.push(vetorComTodos[i].nome)
        empresasDoUsuario.push(obj);

      }
    
    }

    return empresasDoUsuario;
  }

  static async buscaAllEmpresas() {
    const sql = "SELECT empresa.id, empresa.nome FROM empresa";
    const result = await dbcon.query(sql);
    const empresas = result.rows;
    return empresas;
  }


  static async buscaTimesEmpresa(empresa) {
    const sql = `select empresa.id as id, empresa.nome as nome, time.nome as time from empresa
    join time on time.id_empresa = empresa.id 
    where empresa.id = $1;`;
    const result = await dbcon.query(sql, [empresa]);
    const times = result.rows;
    return times;
  }

  static async buscaId(empresa) {
    const sql = `select empresa.id from empresa 
    where empresa.id = $1`;
    const result = await dbcon.query(sql);
    const id = result.rows[0];
    return id;
  }


  static async cadastrar(empresa) {
    const sql = "INSERT INTO public.empresa(nome, chefe) values ($1, $2)";
    const values = [empresa.nome, empresa.chefe];
    try {
      await dbcon.query(sql, values);
    } catch (error) {
      console.log({ error });
    }
  }
}

module.exports = {
  Empresa,
  EmpresaDAO,
};
