const express = require("express");
const appointmentsController = require("../controllers/appointmentsController");

const router = express.Router();
router.param("id", appointmentsController.checkID);

router
  .route("/")
  .get(appointmentsController.getAllAppointments)
  .post(appointmentsController.checkBody, appointmentsController.createAppointment);


module.exports = router;