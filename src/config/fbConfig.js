import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAfxKPiu1Zf876cexkIUr--iLFtMaJFxnc",
    authDomain: "play-e37a6.firebaseapp.com",
    databaseURL: "https://play-e37a6.firebaseio.com",
    projectId: "play-e37a6",
    storageBucket: "play-e37a6.appspot.com",
    messagingSenderId: "469320289654"
  };

  firebase.initializeApp(config);
  firebase.firestore().settings({timestampsInSnapshots: true});

  export default firebase;