const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');

const PORT = process.env.PORT || 4001;

// console.log(process.env);
app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});