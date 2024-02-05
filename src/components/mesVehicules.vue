<template>
    <div class="all">
        <div class="side_barre">

            <nav style="width: 100%;">
                <center>
                    <img style="width: 100px;" src="@/assets/log1.png" alt="" />
                </center>
                <ul>
                    <li>
                        <button :class="{ selected: currentPage === 'home' }" style="display: flex;text-decoration: none;"
                            @click="showPage('home')">
                            <i :style="{ color: currentPage === 'home' ? '#06283dc9' : 'white' }" class="fas fa-home"></i>
                            <h3 :style="{ color: currentPage === 'home' ? '#06283dc9' : 'white' }">Accueil</h3>
                        </button>
                    </li>
                    <li>
                        <button :class="{ selected: currentPage === 'depense' }"
                            style="display: flex;text-decoration: none;" @click="showPage('depense')">
                            <i :style="{ color: currentPage === 'depense' ? '#06283dc9' : 'white' }"
                                class="fas fa-layer-group"></i>
                            <h3 :style="{ color: currentPage === 'depense' ? '#06283dc9' : 'white' }">Dépenses</h3>
                        </button>
                    </li>
                    <li>
                        <button :class="{ selected: currentPage === 'stats' }" style="display: flex;text-decoration: none;"
                            @click="showPage('stats')">
                            <i :style="{ color: currentPage === 'stats' ? '#06283dc9' : 'white' }"
                                class="fas fa-chart-bar"></i>
                            <h3 :style="{ color: currentPage === 'stats' ? '#06283dc9' : 'white' }">Statistiques</h3>
                        </button>
                    </li>
                    <li>
                        <button :class="{ selected: currentPage === 'profil' }" style="display: flex;text-decoration: none;"
                            @click="showPage('profil')">
                            <i :style="{ color: currentPage === 'profil' ? '#06283dc9' : 'white' }" class="fa fa-user"></i>
                            <h3 :style="{ color: currentPage === 'profil' ? '#06283dc9' : 'white' }">Profil</h3>
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
        <div class="extra">

            <div class="page" v-if="currentPage === 'home'">
                <h1 style="color: #06283D;">Ravis de vous revoir Mr. <span v-for="user in users" :key="user.id">{{ user.name
                }}</span></h1>
                <div class="cont">
                    <div class="cont1">

                    </div>
                    <div class="cont2">
                        <div></div>
                        <div></div>
                    </div>
                    <div class="cont3">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>

            <div class="page" v-if="currentPage === 'depense'">
            <!--    <div>
  <h3>Dépenses enregistrées :</h3>
  <ul>
    <li v-for="depense in depenses" :key="depense._id">
      <p>Type de dépense : {{ depense.typeDepense }}</p>
      <p>Montant : {{ depense.montant }}</p>
      <p>Description : {{ depense.libelle }}</p>
      <p>Date : {{ depense.date }}</p>
      <p>ID du véhicule : {{ depense.vehicleId }}</p>
    </li>
  </ul>
</div>-->
                <div class="head">
                    <router-link style="margin-top: -20px;" to="/ajouterD" class="new_car">
                        <img style="width: 50px; height: 50px; margin: auto 10px;" src="@/assets/icon (4).png" alt="">
                        <div style="margin: auto 10px; width: 500px;">
                            <h3>Ajouter une dépense</h3>
                            <p style="margin-top: -20px;">Ajouter une dépense maintenant </p>
                        </div>
                        <img style="width: 25px; height: 25px; margin: auto 10px;" src="@/assets/arrow-right.png" alt="">
                    </router-link>
                </div>
                <!--<div style="margin-top: 50px;">
                    <div v-for="depense in depenses" :key="depense.id" style="margin-top: 10px; display: flex; border-bottom: 1px solid rgba(0, 0, 0, 0.1);">
                        <img style="width: 50px; height: 50px; margin: auto 10px;" src="@/assets/icon (1).png" alt="">
                        <div style="margin: auto 10px; width: 500px;">
                            <h4 style="color: #06283dc9;">{{ depense.typeDepense }}</h4>
                            <h5 style="margin-top: -20px; color: #F2994A;">{{ depense.montant }}</h5>
                        </div>
                        <img style="width: 25px; height: 25px; margin: auto 10px;" src="@/assets/arrow-right.png" alt="">
                    </div>
                </div>-->
                <div style="margin: auto; width: 50%;">
                    <div style="box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2); border-radius: 15px; width: 100%; margin: auto; margin-top: 30px;">
                        <img style="width: 150px; height: 150px; margin-left: 52px;" src="@/assets/ic3.jpg" alt="">
                        <h3 style="text-align: center;color: #06283db7;">Reparation</h3>
                    </div>
                    <div style="box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2); border-radius: 15px; width: 100%; margin: auto; margin-top: 30px;">
                        <img style="width: 150px; height: 150px; margin-left: 52px;" src="@/assets/ic2.jpg" alt="">
                        <h3 style="text-align: center;color: #06283db7;">Carburant</h3>
                    </div>
                    <div style="margin-bottom: 60px!important; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2); border-radius: 15px; width: 100%; margin: auto; margin-top: 30px;">
                        <img style="width: 150px; height: 150px; margin-left: 52px;" src="@/assets/ic4.png" alt="">
                        <h3 style="text-align: center;color: #06283db7;">Autre</h3>
                    </div>
                </div>
            </div>

            <div class="page" v-if="currentPage === 'stats'">
                <h1>Contact Us</h1>
                <p>This is the contact page content.</p>
            </div>

            <div class="page" v-if="currentPage === 'profil'">
                <div>
                    <div class="profil">
                        <img style="width: 80px; height: 80px; margin: auto 10px;" src="@/assets/img1 (4).jpg" alt="">
                        <div class="name">
                            <h1 style="color: #06283D;"><span v-for="user in users" :key="user.id">{{user.name}}</span></h1>
                            <p style="font-size: 15px; margin-top: -10px;">Toute les modification liees a votre compte sont
                                ici</p>
                        </div>
                    </div>
                    <div class="pList">
                        <ul class="list">
                            <li>
                                <img style="width: 30px; margin: auto 0px;" src="@/assets/settings.png" alt="">
                                <span>Parametres</span>
                            </li>
                            <li>
                                <img style="width: 30px  margin: auto 0px;" src="@/assets/help-circle.png" alt="">
                                <span>A propos de nous</span>
                            </li>
                            <li>
                                <img style="width: 30px  margin: auto 0px;" src="@/assets/sun.png" alt="">
                                <span>Theme</span>
                            </li>
                            <li>
                                <img style="width: 30px  margin: auto 0px;" src="@/assets/log-out.png" alt="">
                                <span @click="logout">Deconnexion</span>
                            </li>
                            <li>
                                <img style="width: 30px  margin: auto 0px;" src="@/assets/scroll.png" alt="">
                                <span>Politique de confidentialite</span>
                            </li>
                            <li>
                                <img style="width: 30px  margin: auto 0px;" src="@/assets/newspaper.png" alt="">
                                <span>Termes et conditions</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
        <div class="container">
            <div class="head">
                <router-link to="/ajouterV" class="new_car">
                    <img style="width: 50px; height: 50px; margin: auto 10px;" src="@/assets/icon.png" alt="">
                    <div style="margin: auto 10px; width: 500px;">
                        <h3>Ajouter un véhicule</h3>
                        <p style="margin-top: -20px;">Suivez l'activité de votre véhicule dès maintenant</p>
                    </div>
                    <img style="width: 35px; height: 35px; margin: auto 10px;" src="@/assets/arrow-right.png" alt="">
                </router-link>
            </div>
            <div>
                <div v-if="loading" class="loading-indicator">
                    <!-- Indicateur de chargement, vous pouvez personnaliser cet élément -->
                </div>
                <div v-else class="vList" style="margin-top: 40px;">
                    <router-link v-for="vehicle in vehicles" :key="vehicle.id" :to="'/detailsVehicule/' + vehicle._id" class="car">
                        <img style="width: 100%; height: auto;" :src="vehicle.imageUrl" alt="Image de la voiture" />
                        <div style="padding: 0; border-bottom: 1px solid rgba(0, 0, 0, 0.1);">
                            <h4 style="color: #06283dc9;">{{ vehicle.marque }} {{ vehicle.modele }}</h4>
                            <h5 style="margin-top: -20px; color: #F2994A;">75.000 FCFA ce mois</h5>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 10px 0;">
                            <span style="color: #06283dc9;">4 réparations </span>
                            <span style="color: #06283dc9;">3 chargements</span>
                        </div>
                    </router-link>

                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { firebaseConfig } from '@/config/firebaseConfig';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

// Initialisation de l'application Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export default {
    data() {
        return {
            isAuthenticated: false,
            currentPage: 'profil',
            userId: null,
            vehicleId: null,
            vehicles: [],
            users: [],
            depenses: [],
            loading: false
        };
    },
    mounted() {
        try {
            this.fetchDepenses();
            this.getUserInfos();
            // ...
        } catch (error) {
            console.error('Erreur lors de la récupération des dépenses :', error);
        }
    },
    created() {
        // Récupérer les informations d'authentification depuis le localStorage
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        const userId = localStorage.getItem('userId');

        // Mettre à jour les données du composant avec les informations récupérées
        this.isAuthenticated = isAuthenticated === 'true';
        this.userId = userId;

        if (this.isAuthenticated) {
            // Récupérer les véhicules associés à l'ID de l'utilisateur
            this.getVehicles();
            this.getUserInfos();
        }
    },
    methods: {
        showPage(page) {
            this.currentPage = page;
        },
        async getVehicles() {
            try {
                this.loading = true;
                // Création d'une requête filtrée pour récupérer les voitures de l'utilisateur connecté
                const vehiclesRef = collection(db, 'vehicles');
                const q = query(vehiclesRef, where('userId', '==', this.userId));
                const querySnapshot = await getDocs(q);

                this.vehicles = querySnapshot.docs.map(doc => doc.data());
                this.loading = false; // Fin du chargement
            } catch (error) {
                console.error("Erreur lors de la récupération des véhicules : ", error);
            }
        },
        async getUserInfos() {
      try {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('userId', '==', this.userId));
        console.log(this.userId);
        const querySnapshot = await getDocs(q);
        this.users = querySnapshot.docs.map(doc => doc.data());
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs :', error);
      }
    },
        async fetchDepenses() {
            try {
                this.loading = true;
                const querySnapshot = await getDocs(collection(db, 'depenses'));
                this.depenses = querySnapshot.docs.map((doc) => doc.data());
            } catch (error) {
                console.error('Erreur lors de la récupération des dépenses :', error);
            }
        },
    }
};
</script>
  
<style scoped>
@import url(https://fonts.googleapis.com/css2?family=Monda:wght@100;200;300;400;500;600;700&display=swap);

body {
    width: 100%;
    padding: 0;
    margin: 0;
    background-color: rgba(0, 0, 0, 0.05);
    font-family: Monda;
}

.all {
    background-color: rgba(0, 0, 0, 0.05);
    width: 100%;
    margin: 0;
    padding: 0;
    display: flex !important;
    font-family: Monda;
}

.container {
    width: 40%;
    margin-left: 5%;
    background-color: white;
    padding: 20px;
    height: 95vh;
    overflow-y: auto;
    font-family: Monda;
}

.side_barre {
    width: 15%;
    background-color: #06283D;
}

.side_barre i {
    color: white;
    margin: auto 10px;
    font-size: 25px;

}

.side_barre h3 {
    color: white;
    padding-left: 15px;
    font-family: Monda;
}

.extra {
    width: 40%;
    background-color: white;
    height: 100vh;
    /* Hauteur fixe du conteneur */
    overflow-y: auto;
    padding: 20px;
}

.page {
    margin-top: 20px;
    background-color: transparent;
    width: 95%;
    height: 100vh;
    margin-left: 15px;
}

.new_car {
    width: 100%;
    display: flex;
    text-decoration: none;
    justify-content: space-between;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
}

.vList {

    width: 100%;
    font-family: Monda;

}

.car {
    background-color: rgba(0, 0, 0, 0.05);
    width: 95%;
    padding: 0 2.5%;
    display: block;
    text-decoration: none;
    margin: auto;
    border-radius: 15px;
    margin-top: 15px !important;
}

h3 {
    color: #06283D;
}

p {
    color: rgba(0, 0, 0, 0.2);
    font-size: 12px;
}

/*Scroll bar css*/
.container::-webkit-scrollbar {
    width: 0.1em;
    /* Largeur de la barre de défilement */
}

.extra::-webkit-scrollbar {
    width: 0.1em;
    /* Largeur de la barre de défilement */
}

.extra::-webkit-scrollbar-thumb {
    background-color: transparent;
    /* Couleur de la poignée de défilement */
}

.container::-webkit-scrollbar-thumb {
    background-color: transparent;
    /* Couleur de la poignée de défilement */
}

/*nav barre*/
ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
}

li {
    display: inline;
    margin-right: 10px;
}

button {
    border: none;
    background: none;
    cursor: pointer;
    text-decoration: underline;
    width: 85%;
    margin-left: 15%;
    padding-left: 25px;

}

.loading-indicator {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
    margin-top: 150px;
}

.loading-indicator::after {
    content: "";
    display: inline-block;
    width: 100px;
    height: 100px;
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

.selected {
    background-color: white;
    border-bottom-left-radius: 25px;
    transition: all 0.3s;
    color: #06283D !important;
    border-top-left-radius: 25px;
    /* Ajoutez ici vos styles personnalisés pour le bouton sélectionné */
}

.cont {
    width: 100%;
    display: block;
}

.cont1 {
    width: 100%;
    background-color: rgba(0, 0, 0, 0.05);
    height: 300px;
    border-radius: 15px;
}

.cont2 {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 40px;
}

.cont2 div {
    background-color: rgba(0, 0, 0, 0.05);
    width: 49%;
    border-radius: 15px;
    height: 250px;
}

.cont3 {
    width: 100%;
    display: block;
    margin-top: 40px;

    padding-bottom: 40px !important;
}

.cont3 div {
    background-color: rgba(0, 0, 0, 0.05);
    width: 100%;
    border-radius: 15px;
    margin-top: 20px;
    height: 100px;
}

.profil {
    display: flex;
}

.profil img {
    border: 6px solid white;
    border-radius: 50%;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
}

.profil h1 {
    font-size: 22px;

}

.name {
    margin: auto 15px;
}

.pList {
    margin-top: 50px;
}

.list {
    display: block;
}

.list li {
    display: flex;
    margin-top: 25px;
    width: 100%;
    padding-bottom: 25px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.list li span {
    font-size: 18px;
    margin: auto 10px;
    color: #06283db7 !important;
}

.list li img {
    height: 30px!important;
}
</style>