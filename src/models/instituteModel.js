const pool = require('../config/db.config');

class InstituteModel {
  constructor(institute) {
    this.id = institute.id;
    this.name = institute.name;
    this.country = institute.country;
    this.state = institute.state;
    this.lga = institute.lga;
    this.address = institute.address;
  }

  static async create(institute) {
    let newinstitute = new InstituteModel(institute);
    newinstitute = {
      ...institute
    };

    const instituteQuery = `INSERT INTO institutes(name, country, state, lga, address)
        VALUES($1, $2, $3, $4, $5)
        RETURNING *;`;

    const instituteValue = [
      newinstitute.name,
      newinstitute.country,
      newinstitute.state,
      newinstitute.lga,
      newinstitute.address
    ];

    try {
      const {
        rows
      } = await pool.query(instituteQuery, instituteValue);
      const savedinstitute = rows[0];
      return Promise.resolve(savedinstitute);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async findByName(name) {
    const text = 'SELECT * FROM institutes WHERE name=$1;';
    const value = [name];
    try {
      const {
        rows, rowCount
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

module.exports = InstituteModel;
