const admin = require('firebase-admin');
const atob = require('atob');
// Initialize firebase admin SDK
admin.initializeApp({
  credential: admin.credential.cert(
    JSON.parse(atob(process.env.SERVICE_ACCOUNT_JSON))
  ),
  storageBucket: process.env.storageBucketUrl,
});

// Cloud storage
const bucket = admin.storage().bucket();

module.exports = {
  bucket,
};
