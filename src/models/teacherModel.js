const {
  uuid
} = require('uuidv4');
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
    newTeacher.id = uuid();
    newTeacher.password = hashPassword(newTeacher.password);

    const user = `INSERT INTO
        teachers(id, email, phone, country, state, lga, town, deployed, level_of_education_id)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
        returning *`;
    const auth = `INSERT INTO
        auth(id, email, password)
        VALUES($1, $2, $3)
        returning *`;

    const userValue = [
      newTeacher.id,
      newTeacher.email,
      newTeacher.phone,
      newTeacher.country,
      newTeacher.state,
      newTeacher.lga,
      newTeacher.town,
      newTeacher.deployed,
      newTeacher.level_of_education_id
    ];

    const authValue = [
      newTeacher.id,
      newTeacher.email,
      newTeacher.password
    ];

    try {
      await pool.query(auth, authValue);
      const {
        rows
      } = await pool.query(user, userValue);
      const savedTeacher = rows[0];
      return Promise.resolve(savedTeacher);
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

module.exports = TeacherModel;
