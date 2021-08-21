require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const multer = require('multer');
const DB = require('./database/index');
const rootController = require('./routes/index');
const errorMiddleware = require('./middlewares/errorhandler');

const app = express();

const DbConnection = new DB(process.env.DATABASE_URL);
DbConnection.init();

const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan());
app.use(morgan('common'));
app.use(upload.single('image'));
app.use('/', rootController);
app.use(errorMiddleware);

app.listen(process.env.PORT || 5000, () => {
  console.log('backend server is running');
});
