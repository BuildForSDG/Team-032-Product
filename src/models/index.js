import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import configJson from '../config/dbSequelize.config';

dotenv.config();

const basename = path.basename(__filename);
const env = process.env.NODE_ENV;
const config = configJson[env];

console.log('The current env: ', env);

const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

fs
  .readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
