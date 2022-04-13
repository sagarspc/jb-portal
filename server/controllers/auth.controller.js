const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
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
    roleType:req.body.roleType ,
  })
    .then(user => {
      if (req.body.roleType == 'seeker') {
        user.setRoles([1]).then(() => {
          res.send({ message: "User registered successfully!" });
        });
      }
      else if (req.body.roleType == 'employer') {
        user.setRoles([3]).then(() => {
          res.send({ message: "User registered successfully!" });
        });
      }
      
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        
        res.status(200).send({
          id: user.id,
          username: user.username,
          companyname: user.companyname,
          email: user.email,
          roles:authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};



