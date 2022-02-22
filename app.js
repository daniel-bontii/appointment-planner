const express = require('express');
const morgan = require('morgan');

const contactsRouter = require('./routes/contactsRoutes');
const appointmentsRouter = require('./routes/appointmentsRoutes');

const app = express();

app.use(express.json());
app.use(morgan('dev'));
// if (process.env.NODE_ENV === 'development') {
//   app.use(morgan('dev'));
// }

app.get('/', (req, res) => {
    res.send('Hello world')
})

app.use('/aplanner/api/v1/contacts', contactsRouter);
app.use('/aplanner/api/v1/appointments', appointmentsRouter);

module.exports = app;

