const pool = require("../db");

exports.checkID = async (req, res, next, val) => {
  try {
    const id = await pool.query("SELECT id FROM contacts WHERE ID=$1", [val]);
    if (id.rowCount < 1) {
      return res.status(404).json("Non existent contact");
    }
    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Internal Server error");
  }
};

exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await pool.query("SELECT * FROM contacts");
    res.status(200).json(contacts.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Internal Server error");
  }
};

exports.getContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contac = await pool.query("SELECT * FROM contacts WHERE id=$1", [id]);
    res.status(200).json(contac.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Internal Server error");
  }
};

exports.updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { contactName, contact, email } = req.body;
    await pool.query(
      "UPDATE contacts SET contact_name=$1, contact=$2, email=$3 WHERE id=$4",
      [contactName, contact, email, id]
    );
    res.status(200).json({ message: "Successfully updated department" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Internal Server error");
  }
};
