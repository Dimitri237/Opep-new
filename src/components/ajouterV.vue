<template>
  <div class="all">
    <div class="container monda-font animate__animated animate__fadeInLeft">
      <nav>
        <router-link to="/mesVehicules"><i class="fas fa-chevron-left"></i></router-link>
      </nav>
      <div>
        <h2 class="monda-font">Ajouter un véhicule</h2>
        <p class="stext monda-font">Veuillez renseigner des informations sur tous les <br>champs ci-dessous</p>
      </div>
      <form @submit.prevent="ajouterVehicule">
        <div class="input-field">
          <div><label for="">Marque véhicule</label></div>
          <input type="text" v-model="marque" placeholder="Ex : Mercedez" required>
        </div>
        <div class="input-field">
          <div><label for="">Modèle</label></div>
          <input type="text" v-model="modele" placeholder="Classe C" required>
        </div>
        <div class="input-field">
          <div><label for="password">Ajouter une image</label></div>
          <input class="selectI" type="file" accept="image/*" @change="selectImage">
          <img class="affiche" :src="selectedImage" v-if="selectedImage">
        </div>
        <div class="button">
          <input class="btn" type="submit" value="Annuler">
          <input class="btn" type="submit" value="Valider">
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, doc, getDoc} from 'firebase/firestore';

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
const db = getFirestore(firebaseApp);

export default {
  name: 'AddVehicle',
  data() {
    return {
      marque: '',
      modele: '',
      selectedImage: null,
      userId: null
    };
  },
  created() {
    // Récupérer les informations d'authentification depuis le local storage
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const userId = localStorage.getItem('userId');

    // Mettre à jour les données du composant avec les informations récupérées
    this.isAuthenticated = isAuthenticated === 'true';
    this.userId = userId;
  },
  methods: {
    async ajouterVehicule() {
      if (!this.isAuthenticated) {
        alert('Vous devez être connecté pour ajouter un véhicule.');
        return;
      }
      const vehicle = {
        marque: this.marque,
        modele: this.modele,
        imageUrl: this.selectedImage,
        userId: this.userId // Ajouter l'ID de l'utilisateur au document de la voiture
      };
      try {
        const docRef = await addDoc(collection(db, 'vehicles'), vehicle);
        alert('Véhicule créé', docRef.id);
        // Réinitialiser les champs du formulaire
        this.$router.push("/mesVehicules");
      } catch (error) {
        console.error('Erreur lors de la création du véhicule :', error);
      }
    },
    selectImage(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.selectedImage = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    async fetchUserId() {
      // Récupérer l'utilisateur connecté depuis Firestore
      const userDoc = await getDoc(doc(db, 'users', '<ID_DE_L_UTILISATEUR_CONNECTE>'));
      if (userDoc.exists()) {
        // Récupérer l'ID de l'utilisateur depuis le champ "_id"
        this.userId = userDoc.data()._id;
        console.log('ID de l\'utilisateur :', this.userId); 
      }
    }
  },
  mounted() {
    // Appeler fetchUserId() au montage du composant pour récupérer l'ID de l'utilisateur connecté
    this.fetchUserId();
  }
};
</script>
<style scoped>
.all {}

nav {
  padding-top: 10px;
}

.selectI {
  color: white;
  border: 1px solid rgba(0, 0, 0, 0.2);
  width: 99.6%;
}

h2 {
  font-size: 25px;
  font-weight: bold;
  color: rgba(6, 40, 61, 1);
  margin-top: 20px !important;
}

.stext {
  margin-top: -20px;
  color: rgba(0, 0, 0, 0.2);
  font-size: 13px;
}

.container {
  text-align: left;
  width: 450px;
  margin: 0 auto;
  margin-top: 130px;
  padding: 0 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
}

form {
  width: 100%;
}

.monda-font {
  font-family: 'Monda', sans-serif;
}

.affiche {
  width: 100%;
  height: 300px;
}

.input-field {
  margin-top: 30px;
  width: 100%;
}

input {
  width: 98.3%;
  height: 30px;
  margin-top: 7px;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  outline: none;
}

label {
  font-weight: 450;
  font-size: 17px;
  color: rgba(6, 40, 61, 1);

}

.button {
  width: 100%;
  justify-content: space-between;
  display: flex;
  padding-bottom: 30px;
}

.btn {
  margin-top: 20px;
  font-size: 15px;
  background: rgba(51, 167, 226, 1);
  border: none;
  width: 47%;
  height: 35px;
  color: white;

}

.btn:nth-child(1) {
  background-color: transparent;
  color: rgba(6, 40, 61, 1);
  border: 1px solid rgba(6, 40, 61, 1);
}
</style>