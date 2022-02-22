const pool = require("../db");

exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await pool.query("SELECT * FROM contacts");
    res.status(200).json(contacts.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Internal Server error");
  }
};
