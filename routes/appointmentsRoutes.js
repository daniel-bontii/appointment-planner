const express = require("express");
const appointmentsController = require("../controllers/appointmentsController");

const router = express.Router();
router.param("id", appointmentsController.checkID);

router
  .route("/")
  .post(appointmentsController.checkBody, appointmentsController.createAppointment);


module.exports = router;