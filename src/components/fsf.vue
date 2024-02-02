<template>
    <div class="container monda-font animate__animated animate__fadeInLeft">
      <nav>
        <i class="fas fa-chevron-left"></i>
      </nav>
      <div>
        <h2 class="monda-font">Ajouter un véhicule</h2>
        <p class="stext monda-font">Veuillez renseigner des informations sur tous les <br>champs ci-dessous</p>
      </div>
      <form @submit.prevent="saveCar">
        <div class="input-field">
          <div><label for="marque">Marque véhicule</label></div>
          <input type="text" id="marque" v-model="carBrand" placeholder="Ex : Mercedez" required>
        </div>
        <div class="input-field">
          <div><label for="modele">Modèle</label></div>
          <input type="text" id="modele" v-model="carModel" placeholder="Classe C" required>
        </div>
        <div class="input-field">
          <div><label for="carImage">Ajouter une image</label></div>
          <input class="selectI" id="carImage" type="file" accept="image/*" @change="handleImageChange">
          <img class="affiche" :src="selectedImage" v-if="selectedImage">
        </div>
        <div class="button">
          <button class="btn" type="button" @click="cancel">Annuler</button>
          <button class="btn" type="submit">Valider</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import { getAuth } from 'firebase/auth';
  import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
  import { getStorage, ref, uploadBytes } from 'firebase/storage';
  import { initializeApp } from 'firebase/app';
  
  export default {
    // ...
  
    methods: {
      handleImageChange(event) {
      const file = event.target.files[0];
      this.carImage = file;
    },
      async saveCar() {
        // Récupérez l'utilisateur actuellement authentifié
        const auth = getAuth();
        const user = auth.currentUser;
  
        // Récupérez les informations de la voiture depuis les données du composant
        const carBrand = this.carBrand;
        const carModel = this.carModel;
        const carImage = this.carImage;
  
        // Téléchargez l'image sur Firebase Storage
        const storage = getStorage();
        if (carImage) {
          const storageRef = ref(storage, `carImages/${user.uid}/${carImage.name}`);
          await uploadBytes(storageRef, carImage);
  
          // Obtenez l'URL de téléchargement de l'image
          const imageUrl = await storageRef.getDownloadURL();
  
          // Utilisez les étapes précédentes pour enregistrer les informations de la voiture dans Firestore
          const firebaseConfig = {
            // ... configuration Firebase
          };
          const firebaseApp = initializeApp(firebaseConfig);
  
          const firestore = getFirestore(firebaseApp);
          const carsCollectionRef = collection(firestore, "cars");
          const carDocRef = doc(carsCollectionRef, user.uid);
  
          setDoc(carDocRef, {
            brand: carBrand,
            model: carModel,
            image: imageUrl,
          })
            .then(() => {
              // Enregistrement de la voiture réussi
              console.log("Voiture enregistrée avec succès");
            })
            .catch((error) => {
              // Gérez les erreurs lors de l'enregistrement de la voiture
              console.error("Erreur lors de l'enregistrement de la voiture : ", error);
            });
        } else {
          // Gérez le cas où carImage est indéfinie
          console.error("L'image de la voiture est indéfinie");
        }
      },
  
      // ...
    },
  };
  </script>
  <style scoped>
  nav{
    padding-top: 10px;
  }
  .selectI{
      color: white;
      border: 1px solid rgba(0, 0, 0, 0.2);
      width: 99.6%;
  }
  h2{
      font-size: 25px;
      font-weight: bold;
      color: rgba(6, 40, 61, 1);
      margin-top: 20px!important;
  }
  .stext{
      margin-top: -20px;
      color: rgba(0, 0, 0, 0.2);
      font-size: 13px;
  }
  .container{
      text-align: left;
      width: 450px;
      margin: 0 auto;
      margin-top: 130px;
      padding: 0 20px;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  }
  form{
      width: 100%;
  }
  .monda-font {
      font-family: 'Monda', sans-serif;
    }
    .affiche{
      width: 100%;
      height: 300px;
    }
  .input-field{
      margin-top: 30px;  
      width: 100%;  
  }
  input{
  width: 98.3%;
  height: 30px;
  margin-top: 7px;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  outline: none;
  }
  label{
      font-weight: 450;
      font-size: 17px;
      color: rgba(6, 40, 61, 1);
  
  }
  .button{
      width: 100%;
      justify-content: space-between;
      display: flex;
      padding-bottom: 30px;
  }
  .btn{
      margin-top: 20px;
      font-size: 15px;
      background: rgba(51, 167, 226, 1);
      border: none;
      width: 47%;
      height: 35px;
      color: white;
      
  }
  .btn:nth-child(1){
      background-color: transparent;
      color: rgba(6, 40, 61, 1);
      border: 1px solid rgba(6, 40, 61, 1);
  }
  </style>