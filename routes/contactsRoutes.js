const express = require('express');
const contactsController = require('../controllers/contactsController');

const router = express.Router();

router
  .route('/')
  .get(contactsController.getAllContacts)


module.exports = router;