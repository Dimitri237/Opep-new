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
            <span class="loading-indicator" v-if="loading"></span>
            <div v-else class="button-container" ref="buttonContainer">
              <div class="button-wrapper" ref="this.$refs.buttonContainer.scrollLeft = this.scrollLeft - deltaX;">
                <div class="btns" v-for="typeDepense in typeDepenses" :value="typeDepense.libelle"
                  v-bind:key="typeDepense._id" @click="changeTypeDepense(typeDepense)"
                  :class="{ 'selected-button': typeDepense.libelle === selectedTypeDepense.libelle }">{{
                    typeDepense.libelle }}</div>
              </div>

            </div>
          </div>
          <div>
            <label for="">Sous type</label>
            <span class="loading-indicator" v-if="loading"></span>
            <div v-else class="button-container" ref="buttonContainers">
              <div class="button-wrapper" ref="buttonWrapper">
                <div class="btns" v-for="sousTypeDepense in sousTypeDepenses" :value="sousTypeDepense.libelle"
                  v-bind:key="sousTypeDepense._id" @click="changeSousTypeDepense(sousTypeDepense)"
                  :class="{ 'selected-button': sousTypeDepense.libelle === selectedSousTypeDepense.libelle }">{{
                    sousTypeDepense.libelle }}
                </div>
              </div>

              <!-- @click="changeSousTypeDepense(sousTypeDepense)"
                  :class="{ 'selected-button': sousTypeDepense.libelle === selectedSousTypeDepense.libelle }" -->

            </div>
          </div>


        </div>
        <div class="input-field">
          <div><label for="">Vehicule</label></div>
          <select class="selectM" v-model="selectedVehicle">
            <option v-for="vehicle in vehicles" :value="vehicle._id" v-bind:key="vehicle._id">{{ vehicle._id }} &#8226; {{
              vehicle.marque.libelle }} &#8226;
              {{ vehicle.model.libelle }}</option>
          </select>
        </div>
        <div class="input-field" style="display: flex; justify-content: space-between;">
          <div style="width: 45%;">
            <div><label for="">Montant</label></div>
            <input type="number" v-model="montant" placeholder="15 000fcfa" required>
          </div>
          <div style="width: 45%;"
            v-if="selectedSousTypeDepense.libelle && selectedSousTypeDepense.libelle.toLowerCase().includes('carburant','Huile de frein','Huile  moteur' )">
            <label for="quantite">Quantité : </label>
            <input type="number" placeholder="20 Litres" id="quantite" v-model="quantite">
          </div>
        </div>
        <div class="input-field">
          <div><label for="">Description</label></div>
          <input v-model="libelle" placeholder="Optionel" required>
        </div>
        <div class="input-field">
          <div><label for="">Date</label></div>
          <input type="date" v-model="date">
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
import { TABLE } from '@/config/constantes/tables.js';
import { getDocs, collection, setDoc, doc, query, where } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

export default {
  name: 'AddDepense',
  data() {
    return {
      typeDepense: '',
      montant: '',
      libelle: '',
      loading: false,
      selectedImage: null,
      isAuthenticated: false,
      vehicleId: null,
      selectedVehicle: null,
      typeDepenses: [],
      sousTypeDepenses: [],
      selectedTypeDepense: {},
      selectedSousTypeDepense: [],
      quantite: '',
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
    const containers = this.$refs.buttonContainers;
    container.addEventListener('mousedown', this.handleMouseDown);
    container.addEventListener('mousemove', this.handleMouseMove);
    container.addEventListener('mouseup', this.handleMouseUp);
    container.addEventListener('mouseleave', this.handleMouseLeave);
    containers.addEventListener('mousedown', this.handleMouseDown);
    containers.addEventListener('mousemove', this.handleMouseMove);
    containers.addEventListener('mouseup', this.handleMouseUp);
    containers.addEventListener('mouseleave', this.handleMouseLeave);
    try {
      this.loading = true;
      getDocs(collection(db, TABLE.TYPE_DEPENSE))
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.typeDepenses.push({ _id: doc.id, ...doc.data() });
            // Ajouter la typeDepense à la liste des typeDepenses dans les données du composant
          });

          if (this.typeDepenses.length) { this.selectedTypeDepense = this.typeDepenses[0] }

        });
      getDocs(collection(db, TABLE.SOUS_TYPE_DEPENSE))
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.sousTypeDepenses.push({ _id: doc.id, ...doc.data() });
            // Ajouter la typeDepense à la liste des typeDepenses dans les données du composant
          });

          if (this.sousTypeDepenses.length) { this.selectedSousTypeDepense = this.sousTypeDepenses[0] }

        });
    } catch (error) {
      console.error('Erreur lors de la récupération des typeDepenses :', error);
    }
    this.loading = false; // Mettre loading à false une fois la connexion terminée (succès ou échec)
    //Recuperation des sousTypes de depenses


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

    const containers = this.$refs.buttonContainers;
    containers.removeEventListener('mousedown', this.handleMouseDown);
    containers.removeEventListener('mousemove', this.handleMouseMove);
    containers.removeEventListener('mouseup', this.handleMouseUp);
    containers.removeEventListener('mouseleave', this.handleMouseLeave);

    // ...
  },
  methods: {
    onTypeDepenseChange() {
      if (this.selectedSousTypeDepense == 'Carburant') {
        this.quantite = '';
      }
    },
    handleMouseDown(event) {
      this.isDragging = true;
      this.startX = event.clientX;
      this.scrollLeft = this.$refs.buttonContainer.scrollLeft;
      this.scrollLeft = this.$refs.buttonContainers.scrollLeft;
    },

    handleMouseMove(event) {
      if (!this.isDragging) return;
      event.preventDefault();
      const x = event.clientX;
      const deltaX = x - this.startX;
      this.$refs.buttonContainer.scrollLeft = this.scrollLeft - deltaX;
      this.$refs.buttonContainers.scrollLeft = this.scrollLeft - deltaX;
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
        _id: uuidv4(),
        createdAt: moment().format(),
        date: moment().format(),
        description: this.libelle,
        montant: Number(this.montant),
        quantite: Number(this.quantite),
        type_depense: this.selectedTypeDepense._id,
        updatedAt: moment().format(),
        // Générer un ID unique pour la dépense
        vehiculeId: this.selectedVehicle // Ajouter l'ID du véhicule au document de la dépense
      };
      try {
        setDoc(doc(db, TABLE.DEPENSE, depense._id), depense);

        this.loading = false;
        this.$router.push('/mesVehicules');
      } catch (error) {
        alert('Erreur lors de la création de la dépense :', error);
        this.loading = false;
      }
    },
    changeTypeDepense(typeDepense) {
      this.selectedTypeDepense = typeDepense;
      this.fetchSousTypeDepense(this.selectedTypeDepense._id)
    },
    changeSousTypeDepense(sousTypeDepense) {
      this.selectedSousTypeDepense = sousTypeDepense;
    },
    async fetchSousTypeDepense(idTypeDepense) {
      const sousTypeDepensesRef = collection(db, TABLE.SOUS_TYPE_DEPENSE);
      const q = query(sousTypeDepensesRef, where('idTypeDepense', '==', idTypeDepense));
      const querySnapshot = await getDocs(q);
      this.sousTypeDepenses = querySnapshot.docs.map((doc) => doc.data());
    },
    async fetchVehicles() {
      try {
        const userId = localStorage.getItem('userId');
        const querySnapshot = await getDocs(collection(db, TABLE.CAR));
        this.vehicles = querySnapshot.docs
        .map(doc => ({ ...doc.data(), id: doc.id }))
        .filter(vehicle => vehicle.userId === userId);
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
  margin-top: 30px;
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

.button-wrapper .btns {
  flex-shrink: 0;
  margin-right: 10px;
  border: none;
  border: 1px solid rgba(0, 0, 0, 0.5);
  padding: 5px 25px;
  border-radius: 50px;
  color: rgba(0, 0, 0, 0.5);
  background-color: transparent;
  cursor: pointer;
}

.selected-button {
  color: rgba(51, 167, 226, 1) !important;
  border-color: rgba(51, 167, 226, 1) !important;
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

.btn:nth-child(1) {
  background-color: transparent;
  color: rgba(6, 40, 61, 1);
  border: 1px solid rgba(6, 40, 61, 1);
}
</style>