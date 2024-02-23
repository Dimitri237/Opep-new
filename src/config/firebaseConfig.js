
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
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage();

async function uploadToFirebase(file, fileName) {
    const storageRef = ref(storage, `OpepMedia/images/${fileName}`);
    const uploadTask = uploadBytes(storageRef, file);

    try {
        await uploadTask;
        const url = await getDownloadURL(storageRef);
        return url;
    } catch (error) {
        console.error('Erreur lors du téléchargement de l\'image :', error);
        throw error;
    }
}

// Initialisation de l'application Firebase


const firestore = getFirestore(firebaseApp);
const db = getFirestore(firebaseApp);

export {
    firebaseApp,
    firestore,
    db,
    uploadToFirebase
}