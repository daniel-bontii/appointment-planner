const express = require("express");
const appointmentsController = require("../controllers/appointmentsController");

const router = express.Router();
router.param("id", appointmentsController.checkID);

router
  .route("/")
  .get(appointmentsController.getAllAppointments)
  .post(appointmentsController.checkBody, appointmentsController.createAppointment);

  router
  .route("/:id")
  .get(appointmentsController.getAppointment)
  .put(appointmentsController.updateAppointment)
  .delete(appointmentsController.deleteAppointment)


module.exports = router;