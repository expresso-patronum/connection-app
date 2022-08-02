const { DataTypes, Model } = require('sequelize');

const { sequelizeCon } = require('../config/db-connection');

class Empresa extends Model {}
    
Empresa.init({
}, { 
    sequelize: sequelizeCon, 
    schema: 'public',
    modelName: 'empresa'
}, true);

module.exports = { Empresa };