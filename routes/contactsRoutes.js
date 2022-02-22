const express = require("express");
const contactsController = require("../controllers/contactsController");

const router = express.Router();
router.param('id', contactsController.checkID);

router.route("/").get(contactsController.getAllContacts);
router.route("/:id").get(contactsController.getContact);

module.exports = router;
