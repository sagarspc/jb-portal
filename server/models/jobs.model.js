module.exports = (sequelize, Sequelize) => {
    const Jobs = sequelize.define("jobs", {
     
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      skills: {
        type: Sequelize.STRING
      },
      companyname:{
        type: Sequelize.STRING
      },
      appCount:{
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.INTEGER
      },
      month: {
        type: Sequelize.INTEGER
      }
    });
  
    return Jobs;
  };
  