const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/iron-streams';

mongoose
  .connect(MONGODB_URI)
  .then(() =>  console.info(`Success connection to ${MONGODB_URI}`))
  .catch(error => console.error(`An error ocurred trying to connect to ${MONGODB_URI}`, error));

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.info('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});