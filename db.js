"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rtdb = exports.db = void 0;
const admin = require("firebase-admin");
const ServiceAccount = require("./key.json");
// Initialize Firebase
admin.initializeApp({
    credential: admin.credential.cert(ServiceAccount),
    databaseURL: 'https://apx-dwf-m6-arielgol-default-rtdb.firebaseio.com'
});
const db = admin.firestore();
exports.db = db;
const rtdb = admin.database();
exports.rtdb = rtdb;
