
const { Sequelize } = require('sequelize');
const config = require('./config.json');

const environment = process.env.NODE_ENV || 'development';
const envConfig = config[environment];


const sequelize = new Sequelize(envConfig.database, envConfig.username, envConfig.password, {
  host: envConfig.host,
  dialect: envConfig.dialect,
  logging: false, 
});


sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database synced with alter');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });

module.exports = sequelize;
