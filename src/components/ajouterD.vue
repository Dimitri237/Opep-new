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
          <div>
          <label for="">Type</label>
          <div class="button-container" ref="buttonContainer" >
            <div class="button-wrapper" ref="buttonWrapper">
            <button v-for="typeDepense in typeDepenses" :value="typeDepense" v-bind:key="typeDepense" @click="selectTypeDepense(typeDepense)" :class="{ 'selected-button': typeDepense === selectedTypeDepense }">{{ typeDepense }}</button>
          </div>
          </div>
        </div>
      </div>
        <div class="input-field">
          <div><label for="">Vehicule</label></div>
          <select class="selectM" v-model="selectedVehicle">
            <option v-for="vehicle in vehicles" :value="vehicle._id" v-bind:key="vehicle._id">{{ vehicle._id }} &#8226; {{
              vehicle.marque }} &#8226; {{ vehicle.modele }}</option>
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
import { db } from '@/config/firebaseConfig';
import { getDocs, collection, setDoc, doc, } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

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
      typeDepenses: [],
      selectedTypeDepense: null,
      vehicles: [] // Ajoutez cette ligne pour déclarer la variable "vehicles"
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
    const container = this.$refs.buttonContainer;
    container.addEventListener('mousedown', this.handleMouseDown);
    container.addEventListener('mousemove', this.handleMouseMove);
    container.addEventListener('mouseup', this.handleMouseUp);
    container.addEventListener('mouseleave', this.handleMouseLeave);
    try {
      getDocs(collection(db, 'typeDepenses'))
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const typeDepense = doc.data();

            this.typeDepenses.push(typeDepense.libelle); // Ajouter la typeDepense à la liste des typeDepenses dans les données du composant
          });
        });
    } catch (error) {
      console.error('Erreur lors de la récupération des typeDepenses :', error);
    }
    try {
      this.fetchVehicles(); // Appel à la méthode fetchVehicles pour récupérer les véhicules
    } catch (error) {
      console.error('Erreur lors de la récupération des véhicules :', error);
    }
  },
  beforeUnmount() {
    const container = this.$refs.buttonContainer;
    container.removeEventListener('mousedown', this.handleMouseDown);
    container.removeEventListener('mousemove', this.handleMouseMove);
    container.removeEventListener('mouseup', this.handleMouseUp);
    container.removeEventListener('mouseleave', this.handleMouseLeave);

    // ...
  },
  methods: {
    handleMouseDown(event) {
    this.isDragging = true;
    this.startX = event.clientX;
    this.scrollLeft = this.$refs.buttonContainer.scrollLeft;
  },

  handleMouseMove(event) {
    if (!this.isDragging) return;
    event.preventDefault();
    const x = event.clientX;
    const deltaX = x - this.startX;
    this.$refs.buttonContainer.scrollLeft = this.scrollLeft - deltaX;
  },

  handleMouseUp() {
    this.isDragging = false;
  },

  handleMouseLeave() {
    this.isDragging = false;
  },

    async ajouterDepense() {
      this.loading = true;

      if (!this.isAuthenticated) {
        alert('Vous devez être connecté pour ajouter une dépense.');
        return;
      }
      const depense = {
        _id: uuidv4(),// Générer un ID unique pour la dépense
        typeDepense: this.selectedTypeDepense,
        montant: this.montant,
        libelle: this.libelle,
        date: this.date,
        vehicleId: this.selectedVehicle // Ajouter l'ID du véhicule au document de la dépense
      };
      try {
        setDoc(doc(db, 'depenses', depense._id), depense);

        this.loading = false;
        this.$router.push('/mesVehicules');
      } catch (error) {
        alert('Erreur lors de la création de la dépense :', error);
        this.loading = false;
      }


    },
    selectTypeDepense(typeDepense) {
    this.selectedTypeDepense = typeDepense;
  },
    async fetchVehicles() {
      try {
        const querySnapshot = await getDocs(collection(db, 'vehicles'));
        this.vehicles = querySnapshot.docs.map(doc => ({ ...doc.data() }));
      } catch (error) {
        console.error('Erreur lors de la récupération des véhicules :', error);
      }
    }
  }
};
</script>
<style scoped>
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
  color: rgba(0, 0, 0, 0.5);
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
.button-container {
  overflow: hidden;
}

.button-wrapper {
  display: flex;
  flex-wrap: nowrap;
  margin-top: 15px;
}

.button-wrapper button {
  flex-shrink: 0;
  margin-right: 10px;
  border: none;
  border: 1px solid rgba(0, 0, 0, 0.5);
  padding: 5px 5px;
  border-radius: 5px;
  color: rgba(0, 0, 0, 0.5);
  background-color: transparent;
}
.selected-button {
  background-color: rgba(51, 167, 226, 1)!important;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  border: none!important;
  color: white!important;
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