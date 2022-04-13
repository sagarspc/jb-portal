const db = require("../models");
const User = db.user;
const Role = db.role;
const bcrypt = require("bcryptjs");
const crypto = require('crypto');
const Op = db.Sequelize.Op;

// Save User to Database
exports.createUser = (req, res) => {
  User.create({
    fname: req.body.fname,
    lname: req.body.lname,
    companyname: req.body.companyname,
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    year: req.body.year ?? '',
    month: req.body.month ?? '',
    skills: req.body.skills ?? '',
    title:req.body.title ?? '',
  })
  .then(user => {
    if (req.body.roles) {
      Role.findAll({
        where: {
          name: {
            [Op.or]: req.body.roles
          }
        }
      }).then(roles => {
        user.setRoles(roles).then(() => {
          res.send({ message: "User was registered successfully!" });
        });
      });
    } else {
      // user role = 1
      user.setRoles([1]).then(() => {
        res.send({ message: "User was registered successfully!" });
      });
    }
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
 }

 // Find a User with an id
exports.getUserById = (req, res) => {
  const id = req.params.id;
  User.findByPk(id, { include: [{
    model: Role,
    through: "user_roles",
  }]})
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find User with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id
      });
    });
};


 // Update a User by the id in the request
exports.updateUserById = (req, res) => {
  const id = req.params.id;

  User.findByPk(id).then(user => {
  if (!user) {
    throw new Error('No user found')
  }
  if (req.body.username) user.username = req.body.username;
  if (req.body.email) user.email = req.body.email;
  if (req.body.fname) user.fname = req.body.fname;
  if (req.body.lname) user.lname = req.body.lname;
  if (req.body.companyname) user.companyname = req.body.companyname;
  if (req.body.year) user.year = req.body.year;
  if (req.body.month) user.month = req.body.month;
  if (req.body.skills) user.skills = req.body.skills;
  if (req.body.title) user.title = req.body.title;
  
  if (req.body.roles) {
    Role.findAll({
      where: {
        name: {
          [Op.or]: req.body.roles
        }
      }
    }).then(roles => {
      user.setRoles(roles);
    });
  } 
  
  user.save().then(() => {
    res.status(200).json({msg:"updated successfully a User with id = " + id});
  }).catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });

})
.catch((error) => {
  // do seomthing with the error
  throw new Error(error)
})
};