const { DataTypes, Model } = require('sequelize');

const { sequelizeCon } = require('../config/db-connection');

class Time extends Model {}
    
Time.init({
}, { 
    sequelize: sequelizeCon, 
    schema: 'public',
    modelName: 'time',
    createdAt: false,
    timestamps: true
}, true);

module.exports = { Time };