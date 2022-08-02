const { DataTypes, Model } = require('sequelize');

const { sequelizeCon } = require('../config/db-connection');

class UsuarioTime extends Model { }

UsuarioTime.init({
}, { 
    sequelize: sequelizeCon, 
    schema: 'public',
    modelName: 'usuariotime',
    createdAt: 'created_at',
}, true);

module.exports = { UsuarioTime };