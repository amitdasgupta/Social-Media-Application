const mongoose = require('mongoose');

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

class DB {
  constructor(url) {
    this.url = url;
  }

  init() {
    this.database = mongoose
      .connect(process.env.DATABASE_URL, options)
      .then(() => console.log('Connected to database.'))
      .catch((err) =>
        console.error('Error connecting to database:', err.message)
      );
  }
}

module.exports = DB;
