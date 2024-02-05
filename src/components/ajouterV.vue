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
          <select class="selectM" name="" v-model="marque" id="marques-select">
            <option v-for="marque in marques" :value="marque" v-bind:key="marque">{{ marque }}</option>
          </select>
        </div>
        <div class="input-field">
          <div><label for="">Modèle</label></div>
          <input  v-model="modele" placeholder="Classe C" required>
        </div>
        <div class="input-field">
          <div><label for="">Couleur</label></div>
          <input  v-model="color" placeholder="Rouge, Jaune, verte ...etc" required>
        </div>
        <div class="input-field">
          <div><label for="">Immatriculation</label></div>
          <input v-model="_id" placeholder="CMD4AS5" required>
        </div>
        <div class="input-field">
          <div><label for="password">Ajouter une image</label></div>
          <input class="selectI" type="file" accept="image/*" @change="selectImage">
          <img class="affiche" :src="selectedImage" v-if="selectedImage">
        </div>
        <div class="button">
          <button class="btn" type="submit">
            <span>Annuler</span>
          </button>
          <button class="btn" type="submit" :disabled="loading">
            <span class="loading-indicator" v-if="loading"></span>
            <span>Valider</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { firebaseConfig } from '@/config/firebaseConfig';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, setDoc, doc, getDoc, getDocs} from 'firebase/firestore';


// Initialisation de l'application Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const firestore = getFirestore(firebaseApp);

export default {
  name: 'AddVehicle',
  data() {
    return {
      marque: '',
      modele: '',
      color:'',
      loading: false,
      selectedImage: null,
      isAuthenticated: false,
      userId: null,
      marques: []

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
   mounted() {
    try {
    //const selectElement = document.getElementById('marques-select');

    // Récupérer les marques depuis la base de données Firestore
    getDocs(collection(db, 'marques'))
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const marque = doc.data();
          //const option = document.createElement('option');
         // option.value = marque.libelle; // Utiliser la propriété "libelle" de la marque comme valeur de l'option
         // option.text = marque.libelle;
         // selectElement.appendChild(option);
          this.marques.push(marque.libelle); // Ajouter la marque à la liste des marques dans les données du composant
        });
      })
  } catch (error) {
    console.error('Erreur lors de la récupération des marques :', error);
  }
  this.fetchUserId();
},
  methods: {
    async ajouterVehicule() {
      this.loading = true;

      if (!this.isAuthenticated) {
        alert('Vous devez être connecté pour ajouter un véhicule.');
        return;
      }
      

      const vehicle = {
        marque: this.marque,
        modele: this.modele,
        color: this.color,
        imageUrl: this.selectedImage,
        _id: this._id,
        userId: this.userId // Ajouter l'ID de l'utilisateur au document de la voiture
      };
      try {
        setDoc(doc(firestore, 'vehicles', vehicle._id), {...vehicle})
        
        alert('Véhicule créé');
        // Réinitialiser les champs du formulaire
        this.$router.push("/mesVehicules");
      } catch (error) {
        console.error('Erreur lors de la création du véhicule :', error);
      }
      finally {
        this.loading = false;
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
  
};
</script>
<style scoped>
.all {}

nav {
  padding-top: 10px;
}
.loading-indicator::after {
  content: "";
  display: inline-block;
  width: 23px;
  height: 23px;
  border-radius: 50%;
  border: 3px solid #06283D;
  border-top-color: #F2994A;
  border-bottom-color: #F2994A;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
.loading-indicator {
  display: flex;
  justify-content: center;
  height: 100px;
}
.selectI {
  color: white;
  border: 1px solid rgba(0, 0, 0, 0.2);
  width: 99.6%;
}
.selectM {
  border: 1px solid rgba(0, 0, 0, 0.2);
  width: 99.6%;
  height: 25px;
  outline: none;
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
  margin-top: 60px;
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