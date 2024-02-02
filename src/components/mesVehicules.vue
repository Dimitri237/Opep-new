<template>
    <div class="all">
        <div class="side_barre">

<nav style="width: 100%;">
    <center>
        <img style="width: 100px;" src="@/assets/log1.png" alt="" />
    </center>
    <ul>
        <button @click="logout">Déconnexion</button>
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
    <h1>Welcome to the Home Page</h1>
    <p>This is the home page content.</p>
</div>

<div class="page" v-if="currentPage === 'depense'">
    <div class="head">
        <router-link to="/ajouterV" class="new_car">
            <img style="width: 50px; height: 50px; margin: auto 10px;" src="@/assets/icon (4).png" alt="">
            <div style="margin: auto 10px; width: 500px;">
                <h3>Ajouter une dépense</h3>
                <p style="margin-top: -20px;">Ajouter une dépense maintenant </p>
            </div>
            <img style="width: 25px; height: 25px; margin: auto 10px;" src="@/assets/arrow-right.png" alt="">
        </router-link>
    </div>
    <div style="margin-top: 50px;">
        <div style="margin-top: 10px; display: flex; border-bottom: 1px solid rgba(0, 0, 0, 0.1);">
            <img style="width: 50px; height: 50px; margin: auto 10px;" src="@/assets/icon (1).png" alt="">
            <div style="margin: auto 10px; width: 500px;">
                <h4 style="color: #06283dc9;">Reparation</h4>
                <h5 style="margin-top: -20px; color: #F2994A;">650.000 fcfa</h5>
            </div>
            <img style="width: 25px; height: 25px; margin: auto 10px;" src="@/assets/arrow-right.png" alt="">
        </div>
        <div style="margin-top: 10px; display: flex; border-bottom: 1px solid rgba(0, 0, 0, 0.1);">
            <img style="width: 50px; height: 50px; margin: auto 10px;" src="@/assets/icon (2).png" alt="">
            <div style="margin: auto 10px; width: 500px;">
                <h4 style="color: #06283dc9;">Carburant</h4>
                <h5 style="margin-top: -20px; color: #F2994A;">600.000 fcfa</h5>
            </div>
            <img style="width: 25px; height: 25px; margin: auto 10px;" src="@/assets/arrow-right.png" alt="">
        </div>
        <div style="margin-top: 10px; display: flex; border-bottom: 1px solid rgba(0, 0, 0, 0.1);">
            <img style="width: 50px; height: 50px; margin: auto 10px;" src="@/assets/icon (3).png" alt="">
            <div style="margin: auto 10px; width: 500px;">
                <h4 style="color: #06283dc9;">Administrations</h4>
                <h5 style="margin-top: -20px; color: #F2994A;">300.000 fcfa</h5>
            </div>
            <img style="width: 25px; height: 25px; margin: auto 10px;" src="@/assets/arrow-right.png" alt="">
        </div>
        <div style="margin-top: 10px; display: flex; border-bottom: 1px solid rgba(0, 0, 0, 0.1);">
            <img style="width: 50px; height: 50px; margin: auto 10px;" src="@/assets/icon (4).png" alt="">
            <div style="margin: auto 10px; width: 500px;">
                <h4 style="color: #06283dc9;">Autres</h4>
                <h5 style="margin-top: -20px; color: #F2994A;">100.000 fcfa</h5>
            </div>
            <img style="width: 25px; height: 25px; margin: auto 10px;" src="@/assets/arrow-right.png" alt="">
        </div>
    </div>
</div>

<div class="page" v-if="currentPage === 'stats'">
    <h1>Contact Us</h1>
    <p>This is the contact page content.</p>
</div>

<div class="page" v-if="currentPage === 'profil'">
    <h1>User</h1>
    <p>This is the profile page content.</p>
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
                    <router-link v-for="vehicle in vehicles" :key="vehicle.id" to="/" class="car">
                        <img style="width: 100%; height: auto;" :src="vehicle.imageUrl" alt="Image de la voiture" />
                        <div style="padding: 0; border-bottom: 1px solid rgba(0, 0, 0, 0.1);">
                            <h4 style="color: #06283dc9;">{{ vehicle.marque }}{{ vehicle.modele }}</h4>
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
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

export default {
    data() {
        return {
            isAuthenticated: false,
            currentPage: 'depense',
            userId: null,
            vehicles: [],
            loading: false
        };
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
        }
    },
    methods: {
        Page(page) {
            this.currentPage = page;
        },
        async getVehicles() {
            try {
                this.loading = true;
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

                // Création d'une requête filtrée pour récupérer les voitures de l'utilisateur connecté
                const vehiclesRef = collection(db, 'vehicles');
                const q = query(vehiclesRef, where('userId', '==', this.userId));
                const querySnapshot = await getDocs(q);

                this.vehicles = querySnapshot.docs.map(doc => doc.data());
                this.loading = false; // Fin du chargement
            } catch (error) {
                console.error("Erreur lors de la récupération des véhicules : ", error);
            }
        }
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
    color: #06283D !important;
    border-top-left-radius: 25px;
    /* Ajoutez ici vos styles personnalisés pour le bouton sélectionné */
}
</style>