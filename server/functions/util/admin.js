const admin = require("firebase-admin");

const serviceAccount = require("../serviceAccountKey.json");

const config = require("./config");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    ...config,
});

const db = admin.firestore();

module.exports = { admin, db };
