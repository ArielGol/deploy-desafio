import firebase from "firebase";

  // Initialize Firebase
const config = {
  apiKey:'zQVlVlotseEi0sRHb3zT7J0RoFDn1LeushqODMiq',
  databaseURL: 'https://apx-dwf-m6-arielgol-default-rtdb.firebaseio.com/',
  projectId: 'apx-dwf-m6-arielgol',
  authDomain: 'apx-dwf-m6-arielgol.firebaseapp.com'
}

const intialize=firebase.initializeApp(config);

const rtdb = intialize.database();

export{rtdb};