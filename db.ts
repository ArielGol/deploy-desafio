import *as admin from 'firebase-admin';

import  *as ServiceAccount  from './key.json';


// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(ServiceAccount as any),
  databaseURL:'https://apx-dwf-m6-arielgol-default-rtdb.firebaseio.com'
});

const db=admin.firestore();
const rtdb=admin.database();



export {
  db,rtdb
}