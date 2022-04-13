const db = require("../models");
const Job = db.jobs;
const Op = db.Sequelize.Op;

// Create and Save a new Job
exports.createJob = (req, res) => {
  console.log("Job create________",req.body)
  Job.create({
    title: req.body.title,
    description: req.body.description,
    skills: req.body.skills,
    companyname: req.body.companyname,
    appCount: req.body.appCount,
    year: req.body.year,
    month: req.body.month
  })
  .then(data => {
    //res.status(200).send(data);
    res.status(200).json({
		  success: true,
		  message: 'job added Successfully. '
		});
  })
  .catch(err => {
    res.status(500).json({ message: err.message });
  });
};

// Retrieve all Jobs from the database.
exports.getJobs = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Job.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Job."
      });
    });
};

// Find a single Job with an id
exports.getJobById = (req, res) => {
  const id = req.params.id;

  Job.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Job with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Job with id=" + id
      });
    });
};

// Update a Job by the id in the request
exports.updateJobById = (req, res) => {
  const id = req.params.id;

  Job.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Job was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Job with id=${id}. Maybe Job was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Job with id=" + id
      });
    });
};

// Delete a Job with the specified id in the request
exports.deleteJobById = (req, res) => {
  const id = req.params.id;

  Job.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Job was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Job with id=${id}. Maybe Job was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Job with id=" + id
      });
    });
};