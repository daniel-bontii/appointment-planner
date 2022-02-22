const pool = require("../db");

exports.checkBody = async (req, res, next) => {
  try {
    const { appointmentTitle, appointmentDate, appointmentTime } = req.body;
    if (!(appointmentTitle && appointmentDate && appointmentTime)) {
      return res.status(400).json("Please fill out all feilds");
    }
    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Internal Server error");
  }
};

exports.checkID = async (req, res, next, val) => {
  try {
    const id = await pool.query("SELECT id FROM appointments WHERE ID=$1", [
      val,
    ]);

    if (id.rowCount < 1) {
      return res.status(404).json("Non existent appointment");
    }
    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Internal Server error");
  }
};

exports.createAppointment = async (req, res) => {
  try {
    const { appointmentTitle, appointmentDate, appointmentTime } = req.body;

    const timeCheck = await pool.query(
      "SELECT appointment_time from appointments WHERE appointment_time=$1",
      [appointmentTime]
    );
    const dateCheck = await pool.query(
      "SELECT appointment_date from appointments WHERE appointment_date=$1",
      [appointmentDate]
    );
    if (timeCheck.rowCount > 0 && dateCheck.rowCount > 0) {
      return res.status(404).json("Slot has been taken already");
    }
    const newAppointment = await pool.query(
      "INSERT INTO appointments (appointment_title, appointment_date, appointment_time) VALUES($1, $2, $3) RETURNING *",
      [appointmentTitle, appointmentDate, appointmentTime]
    );
    res.status(201).json(newAppointment.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Internal Server error");
  }
};
