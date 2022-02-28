require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const DB = require('./database/index');
const rootController = require('./routes/index');
const errorMiddleware = require('./middlewares/errorhandler');
const socketIO = require('./helpers/socketIO');

const app = express();
// const server = http.createServer(app);

const DbConnection = new DB(process.env.DATABASE_URL);
DbConnection.init();

app.use(cors());
app.use(express.json());
if (process.env === 'production') {
  app.use(express.static(path.join(__dirname, './client/build')));
}
app.use(express.urlencoded({ extended: true }));
app.use(morgan());
app.use(morgan('common'));

app.use('/', rootController);
app.use(errorMiddleware);

if (process.env === 'production') {
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
  });
}
const server = app.listen(process.env.PORT || 5000, () => {
  console.log('backend server is running');
});
socketIO.connect(server);
