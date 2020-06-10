const {
  uuid
} = require('uuidv4');
const pool = require('../config/db.config');

const {
  hashPassword
} = require('../utils/passwordHash');

class TrainerModel {
  constructor(trainer) {
    this.email = trainer.email;
    this.phone = trainer.phone;
    this.password = trainer.password;
    this.country = trainer.country;
    this.state = trainer.state;
    this.lga = trainer.lga;
    this.town = trainer.town;
    this.institute_id = trainer.institute_id;
  }

  static async create(trainer) {
    let newTrainer = new TrainerModel(trainer);
    newTrainer = {
      ...trainer
    };
    newTrainer.password = hashPassword(newTrainer.password);

    const user = `INSERT INTO
        trainers(email, phone, country, state, lga, town, institute_id)
        VALUES($1, $2, $3, $4, $5, $6, $7)
        returning *`;
    const auth = `INSERT INTO
        auth(email, password)
        VALUES($1, $2)
        returning *`;

    const userValue = [
      newTrainer.email,
      newTrainer.phone,
      newTrainer.country,
      newTrainer.state,
      newTrainer.lga,
      newTrainer.town,
      newTrainer.institute_id
    ];

    const authValue = [newTrainer.email, newTrainer.password];

    try {
      await pool.query(auth, authValue);
      const {
        rows
      } = await pool.query(user, userValue);
      const savedTrainer = rows[0];
      return Promise.resolve(savedTrainer);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async findByEmail(email) {
    const text = ' SELECT * FROM auth WHERE email= $1 ';
    const value = [email];
    try {
      const {
        rows,
        rowCount
      } = await pool.query(text, value);
      const result = {
        rows,
        rowCount
      };
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

module.exports = TrainerModel;
