module.exports = app => {
  const datas = require("../controllers/data.controller.js");

  var router = require("express").Router();

  // Create a new data
  router.post("/", datas.create);

  // Retrieve all datas
  router.get("/", datas.findAll);

  // Retrieve all published datas
  router.get("/published", datas.findAllPublished);

  // Retrieve a single data with id
  router.get("/:id", datas.findOne);

  // Update a data with id
  router.put("/:id", datas.update);

  // Delete a data with id
  router.delete("/:id", datas.delete);

  // Create a new data
  router.delete("/", datas.deleteAll);

  app.use("/api/datas", router);
};
