
import { initializeApp } from 'firebase/app';
import { getFirestore} from 'firebase/firestore';


 const firebaseConfig = {
    apiKey: "AIzaSyB3xwNS3fEjLQU4PoP4mGh2T0bxnCQZfU4",
    authDomain: "opepapp-42901.firebaseapp.com",
    projectId: "opepapp-42901",
    storageBucket: "opepapp-42901.appspot.com",
    messagingSenderId: "882367393120",
    appId: "1:882367393120:web:64b87817d15d9571410205"
};


// Initialisation de l'application Firebase

const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);
const db = getFirestore(firebaseApp);

export {
    firebaseApp,
    firestore,
    db
}