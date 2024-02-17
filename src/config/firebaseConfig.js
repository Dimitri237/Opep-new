
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL, } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyCRcdmH2_dDPSOxTTCbDrNtX-_aTKqlrsM",
    authDomain: "opep-4b097.firebaseapp.com",
    projectId: "opep-4b097",
    storageBucket: "opep-4b097.appspot.com",
    messagingSenderId: "791626645352",
    appId: "1:791626645352:web:323c90064720950c0020dd"
};

const uploadToFirebase = async (file, fileName) => {
    const storage = getStorage();
    const storageRef = ref(storage, `OpepMedia/images/${fileName}`);
    // Convertir l'image en blob avec le type "image/jpeg"
    const blob = await fetch(file).then((response) => response.blob());

    // Charger le blob d'image dans le stockage de Firebase
    await uploadBytes(storageRef, blob);

    return await getDownloadURL(storageRef);
}


// Initialisation de l'application Firebase

const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);
const db = getFirestore(firebaseApp);

export {
    firebaseApp,
    firestore,
    db,
    uploadToFirebase
}