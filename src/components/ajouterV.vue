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
            <option v-for="marque in marques" :value="marque._id" v-bind:key="marque._id">{{ marque.libelle }}</option>
          </select>
        </div>
        <div style="display: flex; justify-content: space-between; margin-top: 20px;">
          <div style="width: 47%;">
            <div><label for="">Modele véhicule</label></div>
            <select class="selectM" name="" v-model="modele" id="modeles-select">
              <option v-for="modele in modeles" :value="modele._id" v-bind:key="modele._id">{{ modele.libelle }}</option>
            </select>
          </div>
          <div style="width: 47%;">
            <div><label for="">Annee véhicule</label></div>
            <select class="selectM" name="" v-model="annee" id="annees-select">
              <option v-for="a in annees" :value="a" v-bind:key="a">{{ a }}</option>
            </select>
          </div>
        </div>

        <div class="input-field">
          <div><label for="">Couleur</label></div>
          <input v-model="color" placeholder="Rouge, Jaune, verte ...etc" required>
        </div>
        <div class="input-field">
          <div><label for="">Immatriculation</label></div>
          <input v-model="id" placeholder="CMD4AS5" required>
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
import { db, firestore, uploadToFirebase } from '@/config/firebaseConfig';
import { collection, setDoc, doc, getDocs } from 'firebase/firestore';
import { TABLE } from '@/config/constantes/tables.js';
import  moment  from 'moment';

export default {
  name: 'AddVehicle',
  data() {
    return {
      id:'',
      marque: '',
      modele: '',
      color: '',
      loading: false,
      createdAt: moment().format(),
      updatedAt: moment().format(),
      selectedImage: null,
      isAuthenticated: false,
      userId: null,
      marques: [],
      modeles: [],
      annees: [],
      annee: [],
      fileName:''
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
      const date = new Date();

      for (let index = date.getFullYear() - 24; index <= date.getFullYear(); index++) {
        this.annees.push(index);
      }

      // Récupérer les marques depuis la base de données Firestore
      getDocs(collection(firestore, TABLE.CAR_MARQUE)).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const marque = {_id:doc.id, ...doc.data()}
          this.marques.push(marque);
        });
      });

      // Récupérer les modèles depuis la base de données Firestore
      getDocs(collection(db, TABLE.CAR_MODEL)).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const modele = {_id:doc.id, ...doc.data()};
          this.modeles.push(modele);
        });
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des marques :', error);
    }
  },
  methods: {
    async ajouterVehicule() {
      this.loading = true;

      if (!this.isAuthenticated) {
        alert('Vous devez être connecté pour ajouter un véhicule.');
        return;
      }


      try {
        
        const url = await uploadToFirebase(this.selectedImage, this.fileName);
        const vehicle = {
          _id: this.id, // Veuillez spécifier la source de cet ID (_id)
        marque: this.marques.find(m=>m._id === this.marque),
        model: this.modeles.find(m=>m._id === this.modele),
        annee: this.annee,
        color: this.color,
        userId: this.userId,
        images: [{createdAt: moment().format(),url}],
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
      };
      console.log({vehicle});

        await setDoc(doc(firestore, TABLE.CAR, vehicle._id), { ...vehicle });

        alert('Véhicule créé');
        // Réinitialiser les champs du formulaire
        this.$router.push("/mesVehicules");
      } catch (error) {
        console.error('Erreur lors du téléchargement de l\'image :', error);
      } finally {
        this.loading = false;
      }
    },
    selectImage(event) {
      const file = event.target.files[0];
      this.fileName=  file.name
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.selectedImage = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
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
  height: auto;
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