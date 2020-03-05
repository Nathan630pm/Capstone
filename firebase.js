import * as firebase from 'firebase';
import "firebase/firestore";


// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAnp2w6mmIMWK7k-LBwoQKyBEd2zx22Kkk",
    authDomain: "liveibmcounter.firebaseapp.com",
    databaseURL: "https://liveibmcounter.firebaseio.com",
    projectId: "liveibmcounter",
    storageBucket: "liveibmcounter.appspot.com",
    messagingSenderId: "950526766833",
    appId: "1:950526766833:web:adef51e4d6b89f24ff4350"
};

firebase.initializeApp(firebaseConfig);

// export default firebase;
export default firebase;