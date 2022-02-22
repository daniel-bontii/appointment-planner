const pool = require("../db");

exports.checkBody = async (req, res, next) => {
  try {
    const { contactName, email } = req.body;
    if (!contactName, email) {
      return res.status(400).json("Please fill out name and email fields");
    }
    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Internal Server error");
  }
};

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
    res.status(200).json({ message: "Successfully updated Contact" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Internal Server error");
  }
};

exports.createContact = async (req, res) => {
  try {
    const { contactName, contact, email } = req.body;

    const check = await pool.query(
      "SELECT email from contacts WHERE email=$1",
      [email]
    );
    if (check.rowCount > 0) {
      return res.json("User already exists");
    }
    const newContact = await pool.query(
      "INSERT INTO contacts (contact_name, contact, email) VALUES($1, $2, $3) RETURNING *",
      [contactName, contact, email]
    );
    res.status(201).json(newContact.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Internal Server error");
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM contacts WHERE id=$1", [id]);
    res.status(204).send();
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Internal Server error");
  }
};
