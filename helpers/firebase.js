const admin = require('firebase-admin');

const serviceAccount = require('../serviceAccountKey.json');

// Initialize firebase admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.storageBucketUrl,
});

// Cloud storage
const bucket = admin.storage().bucket();

module.exports = {
  bucket,
};
