module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    fname: {
      type: Sequelize.STRING
    },
    lname: {
      type: Sequelize.STRING
    },
    username: {
      type: Sequelize.STRING
    },
    companyname: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    year: {
      type: Sequelize.INTEGER
    },
    month: {
      type: Sequelize.INTEGER
    },
    title: {
      type: Sequelize.STRING
    },
    skills: {
      type: Sequelize.STRING
    }
  });

  return User;
};
