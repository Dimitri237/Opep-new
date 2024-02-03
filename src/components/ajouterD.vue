<template>
  <div class="all">
    <div class="container monda-font animate__animated animate__fadeInLeft">
      <nav>
        <router-link to="/mesVehicules"><i class="fas fa-chevron-left"></i></router-link>
      </nav>
      <div>
        <h2 class="monda-font">Ajouter une depense</h2>
        <p class="stext monda-font">Veuillez renseigner des informations sur tous les <br>champs ci-dessous</p>
      </div>
      <form @submit.prevent="ajouterDepense">
        <div class="input-field">
          <select v-model="selectedVehicle">
            <option value="">Sélectionner un véhicule</option>
            <option v-for="typeDepense in typeDepenses" :value="typeDepense" v-bind:key="typeDepense">{{ typeDepense }}</option>
          </select>
        </div>
        <div class="input-field">
          <div><label for="">Type</label></div>
          <select class="selectM" name="" v-model="typeDepense">
            <option v-for="typeDepense in typeDepenses" :value="typeDepense" v-bind:key="typeDepense">{{ typeDepense }}
            </option>
          </select>
        </div>
        <div class="input-field">
          <div><label for="">Montant</label></div>
          <input v-model="montant" placeholder="15 000fcfa" required>
        </div>
        <div class="input-field">
          <div><label for="">Description</label></div>
          <input v-model="libelle" placeholder="Optionel" required>
        </div>
        <div class="input-field">
          <div><label for="">Date</label></div>
          <input type="date" v-model="date" required>
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
import { initializeApp } from 'firebase/app';
import { v4 as uuidv4 } from 'uuid';
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc } from 'firebase/firestore';

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
  name: 'AddDepense',
  data() {
    return {
      typeDepense: '',
      montant: '',
      libelle: '',
      date: '',
      loading: false,
      selectedImage: null,
      isAuthenticated: false,
      vehicleId: null,
      selectedVehicle: null,
      typeDepenses: []

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

      getDocs(collection(db, 'typeDepenses'))
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const typeDepense = doc.data();

            this.typeDepenses.push(typeDepense.libelle); // Ajouter la typeDepense à la liste des typeDepenses dans les données du composant
          });
        })
    } catch (error) {
      console.error('Erreur lors de la récupération des typeDepenses :', error);
    }
    try {
      this.fetchVehicles(); // Appel à la méthode fetchVehicles pour récupérer les véhicules
      // ...
    } catch (error) {
      console.error('Erreur lors de la récupération des véhicules :', error);
    }
  },
  methods: {
    async ajouterDepense() {
      this.loading = true;

      if (!this.isAuthenticated) {
        alert('Vous devez être connecté pour ajouter une depense.');
        return;
      }


      const depense = {
        typeDepense: this.typeDepense,
        montant: this.montant,
        libelle: this.libelle,
        date: this.date,
        vehicleId: this.selectedVehicle // Ajouter l'ID du vehicule au document de la depense
      };
      // Générer un ID unique pour la dépense
      const id = uuidv4();
      depense._id = id;
      try {
        const docRef = await addDoc(collection(db, 'depenses'), depense);

        // Mettre à jour le document du véhicule avec les informations de la dépense
        const vehicleDocRef = doc(db, 'vehicles', this.selectedVehicle);
        await updateDoc(vehicleDocRef, {
          depenseId: docRef.id
        });

        alert('Depense créé', docRef.id);
        // Réinitialiser les champs du formulaire
        this.$router.push("/mesVehicules");
      } catch (error) {
        console.error('Erreur lors de la création de la depense :', error);
      }
      finally {
        this.loading = false;
      }
    },
    async fetchVehicles() {
      try {
        const querySnapshot = await getDocs(collection(db, 'vehicles'));
        this.vehicles = querySnapshot.docs.map(doc => ({
          id: doc.id,
          marque: doc.data().marque, // Ajouter le champ "marque"
          ...doc.data()
        }));
      } catch (error) {
        console.error('Erreur lors de la récupération des véhicules :', error);
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