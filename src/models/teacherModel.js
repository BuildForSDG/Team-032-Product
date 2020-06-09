const pool = require('../config/db.config');

const {
  hashPassword
} = require('../utils/passwordHash');

class TeacherModel {
  constructor(teacher) {
    this.id = teacher.id;
    this.email = teacher.email;
    this.phone = teacher.phone;
    this.password = teacher.password;
    this.country = teacher.country;
    this.state = teacher.state;
    this.lga = teacher.lga;
    this.town = teacher.town;
    this.deployed = teacher.deployed;
    this.level_of_education_id = teacher.level_of_education_id;
  }

  static async create(teacher) {
    let newTeacher = new TeacherModel(teacher);
    newTeacher = {
      ...teacher
    };
    newTeacher.password = hashPassword(newTeacher.password);

    const user = `INSERT INTO
        teachers(email, phone, country, state, lga, town, deployed, level_of_education_id)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8)
        returning *`;
    const auth = `INSERT INTO
        auth(email, password)
        VALUES($1, $2)
        returning *`;

    const userValue = [
      newTeacher.email,
      newTeacher.phone,
      newTeacher.country,
      newTeacher.state,
      newTeacher.lga,
      newTeacher.town,
      newTeacher.deployed,
      newTeacher.level_of_education_id
    ];

    const authValue = [newTeacher.email, newTeacher.password];

    try {
      const {
        rows
      } = await pool.query(user, userValue);
      await pool.query(auth, authValue);
      const savedTeacher = rows[0];
      return Promise.resolve(savedTeacher);
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

module.exports = TeacherModel;
