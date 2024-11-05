const db = require("../models");
const Data = db.Datas;

// Create and Save a new Data
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Data
  const Data = new Data({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  });

  // Save Data in the database
  Data
    .save(Data)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Data."
      });
    });
};

// Retrieve all Datas from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Data.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Datas."
      });
    });
};

// Find a single Data with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Data.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Data with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Data with id=" + id });
    });
};

// Update a Data by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Data.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Data with id=${id}. Maybe Data was not found!`
        });
      } else res.send({ message: "Data was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Data with id=" + id
      });
    });
};

// Delete a Data with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Data.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Data with id=${id}. Maybe Data was not found!`
        });
      } else {
        res.send({
          message: "Data was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Data with id=" + id
      });
    });
};

// Delete all Datas from the database.
exports.deleteAll = (req, res) => {
  Data.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Datas were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Datas."
      });
    });
};

// Find all published Datas
exports.findAllPublished = (req, res) => {
  Data.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Datas."
      });
    });
};
