module.exports = (sequelize, DataTypes) => {

  const Auth = sequelize.define('Auth', {



    email: {

      type: DataTypes.STRING,

      allowNull: false

    },

    password: {

      type: DataTypes.STRING,

      allowNull: false

    }

  }, {});



  return Auth;

};

