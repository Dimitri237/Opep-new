
import { initializeApp } from 'firebase/app';
import { getFirestore} from 'firebase/firestore';


 const firebaseConfig = {
    apiKey: "AIzaSyA2hQVzKO_2RO6WJtKJxtRg1_JbtMt4vbI",
    authDomain: "opep-new.firebaseapp.com",
    projectId: "opep-new",
    storageBucket: "opep-new.appspot.com",
    messagingSenderId: "990565326767",
    appId: "1:990565326767:web:c5f6c4ca18d650c1e5995a"
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