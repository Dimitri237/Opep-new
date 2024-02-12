<template>
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
                    <button :class="{ selected: currentPage === 'depense' }" style="display: flex;text-decoration: none;"
                        @click="showPage('depense')">
                        <i :style="{ color: currentPage === 'depense' ? '#06283dc9' : 'white' }"
                            class="fas fa-layer-group"></i>
                        <h3 :style="{ color: currentPage === 'depense' ? '#06283dc9' : 'white' }">Dépenses</h3>
                    </button>
                </li>
                <li>
                    <button :class="{ selected: currentPage === 'stats' }" style="display: flex;text-decoration: none;"
                        @click="showPage('stats')">
                        <i :style="{ color: currentPage === 'stats' ? '#06283dc9' : 'white' }" class="fas fa-chart-bar"></i>
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
            <h1 class="animate__animated animate__fadeInUp" style="font-size: 26px; color: #06283D;">Ravis de vous revoir
                Mr. <span>{{ currentUser ? currentUser.name : '' }}</span></h1>
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

        <div style=" width: 100%;" class="page" v-if="currentPage === 'depense'">
            <div class="head">
                <router-link style="margin-left: -15px;" to="/ajouterD" class="new_car">
                    <img style="width: 50px; height: 50px; margin: auto 10px;" src="@/assets/icon (4).png" alt="">
                    <div style="margin: auto 10px; width: 500px;">
                        <h3>Ajouter une dépense</h3>
                        <p style="margin-top: -20px;">Ajouter une dépense maintenant </p>
                    </div>
                    <img style="width: 25px; height: 25px; margin: auto 10px;" src="@/assets/arrow-right.png" alt="">
                </router-link>
            </div>

            <div style="margin-top: 100px; width: 100%;">
                <h2 style="font-size: 26px; color: #06283D;">Résumé</h2>
                <div class="resume">
                    <div style="display: flex; justify-content: space-between;">
                        <div @click="getAllDepensesByType('Reparation')" class="inbox">
                            <img src="@/assets/icon (1).png" alt="">
                            <h3>Reparation</h3>
                            <p>{{ totalDepenses }} fcfa</p>
                        </div>
                        <div @click="getAllDepensesByType('Consommation')" style="text-decoration: none;" class="inbox">
                            <img src="@/assets/icon (2).png" alt="">
                            <h3>Consommation</h3>
                            <p>{{ totalDepenses }} fcfa</p>
                        </div>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <div @click="getAllDepensesByType('Administration')" class="inbox">
                            <img src="@/assets/icon (3).png" alt="">
                            <h3>Administrations</h3>
                            <p>{{ totalDepenses }} fcfa</p>
                        </div>
                        <div @click="getAllDepensesByType('Autres')" class="inbox">
                            <img src="@/assets/icon (4).png" alt="">
                            <h3>Autres</h3>
                            <p>{{ totalDepenses }} fcfa</p>
                        </div>
                    </div>
                </div>
            </div>
            <div style="margin: auto; padding-top: 60px!important; width: 100%;">
                <div>
                    <h2 style="color: #06283D;">Ce mois</h2>
                    <ul class="dMois">
                        <li style="width: 97%; border-bottom: 1px solid rgba(0, 0, 0, 0.2); padding: 5px 10px; margin-top: 15px; display: flex; justify-content: space-between;"
                            v-for="depense in depenses" :key="depense.id">
                            <div style="display: block;">
                                <h4 style="margin-top: 0px;"> {{ depense.typeDepense }}</h4> <br>
                                <h4 style="margin-top: -40px;">{{ depense.libelle }}</h4>
                            </div>
                            <div>
                                <h4 style="color: #F2994A; ">{{ depense.montant }} fcfa</h4>
                            </div>
                        </li>
                    </ul>
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
                        <h1 style="color: #06283D;"><span>{{ currentUser ? currentUser.name : '' }}</span>
                        </h1>
                        <p style="font-size: 15px; margin-top: -10px;">{{ currentUser ? currentUser.contact : '' }}</p>
                    </div>
                </div>
                <div class="pList">
                    <ul class="list">
                        <li>
                            <img style="width: 30px; margin: auto 0px;" src="@/assets/settings.png" alt="">
                            <router-link style="text-decoration: none;"
                            :to="{ name: 'modifierUser', params: { userId: getUserIdFromLocalStorage() } }"><span>Parametres</span></router-link>
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
</template>
<script>
import { collection, getDocs, query, where } from 'firebase/firestore';
import {TABLE} from '@/config/constantes/tables.js';
import { db } from '@/config/firebaseConfig';

export default {
    
    components: {
    },
    data() {
        return {
            isAuthenticated: false,
            currentPage: 'profil',
            userId: null,
            vehicleId: null,
            typeDepenses: [],
            vehicles: [],
            currentUser: null, // Variable pour stocker les informations de l'utilisateur connecté
            depenses: [],
            idTypeDepense: null,
            moisActuel: new Date().getMonth(),
            loading: false
        };
    },
    mounted() {
        try {
            this.fetchDepenses();
            this.fetchCurrentUser();
            this.fetchTypeDepense();
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
            this.fetchCurrentUser();
        }
    },
    computed: {
        depensesFiltrees() {
            const moisActuel = new Date().getMonth();
            return this.depenses.filter((expense) => expense.mois === moisActuel);
        },
        totalDepenses() {
            return this.depenses.reduce((total, depense) => total + depense.montant, 0);
        },

    },
    
    methods: {
        getUserIdFromLocalStorage() {
      return localStorage.getItem('userId');
    },
        async getAllDepensesByType(libelle) {
            const id = this.typeDepenses.find((typeDepense) => typeDepense.libelle.toLowerCase().includes(libelle.toLowerCase()))._id;
            const totalDepenses = await this.getTotalDepensesByType(libelle);

            console.log('Total des dépenses:', totalDepenses);
            const depensesRef = collection(db, TABLE.DEPENSE);
            const q = query(depensesRef, where('idTypeDepense', '==', id));
            const querySnapshot = await getDocs(q);
            this.depenses = querySnapshot.docs.map((doc) => doc.data());

            console.log(this.depenses);
            this.$router.push('/listingDepenses/' + id);
        },
        async getTotalDepensesByType(libelle) {
            const id = this.typeDepenses.find((typeDepense) =>
                typeDepense.libelle.toLowerCase().includes(libelle.toLowerCase())
            )._id;

            const depensesRef = collection(db, TABLE.DEPENSE);
            const q = query(depensesRef, where('idTypeDepense', '==', id));
            const querySnapshot = await getDocs(q);
            const depenses = querySnapshot.docs.map((doc) => doc.data());

            // Calculer le total des dépenses
            const totalDepenses = depenses.reduce((total, depense) => total + depense.montant, 0);
            const result = {};

            depenses.forEach((depense) => {
                if (result[depense.idTypeDepense]) {
                    result[depense.idTypeDepense] += depense.montant;
                } else {
                    result[depense.idTypeDepense] = depense.montant;
                }
            });
            return totalDepenses;
        },
        async fetchCurrentUser() {
            const userId = localStorage.getItem('userId'); // Récupérer l'ID de l'utilisateur connecté depuis le localStorage

            const usersRef = collection(db, 'users');
            const queryRef = query(usersRef, where('_id', '==', userId));

            try {
                const querySnapshot = await getDocs(queryRef);
                if (!querySnapshot.empty) {
                    this.currentUser = querySnapshot.docs[0].data();
                }
            } catch (error) {
                console.error('Erreur lors de la récupération de l\'utilisateur connecté :', error);
            }
        },
        showPage(page) {
            this.currentPage = page;
        },
        logout() {
            // Supprimer les informations de connexion de localStorage
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('userId');

            // Réinitialiser les variables de l'état de connexion
            this.isAuthenticated = false;
            this.userId = null;

            // Rediriger l'utilisateur vers la page de connexion
            this.$router.push("/auth");
        },
        async fetchDepenses() {
            try {
                this.loading = true;
                const querySnapshot = await getDocs(collection(db, TABLE.DEPENSE));
                this.depenses = querySnapshot.docs.map((doc) => doc.data());
            } catch (error) {
                console.error('Erreur lors de la récupération des dépenses :', error);
            }
        },
        async fetchTypeDepense() {
            try {
                this.loading = true;
                const querySnapshot = await getDocs(collection(db, TABLE.TYPE_DEPENSE));
                this.typeDepenses = querySnapshot.docs.map((doc) => ({ _id: doc.id, ...doc.data() }));


            } catch (error) {
                console.error('Erreur lors de la récupération des dépenses :', error);
            } finally {
                this.loading = false;
            }
        },
        filtrerParMois() {
            // Appeler cette méthode pour mettre à jour les dépenses filtrées
            this.depensesFiltrees;
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

.resume {
    display: block;
    width: 100%;
}

.inbox {
    background-color: rgba(0, 0, 0, 0.05);
    width: 42%;
    border-radius: 15px;
    margin-top: 15px;
    padding: 15px;
}

.inbox p {
    color: #F2994A;
    font-size: 13px;
    font-weight: bold;
}

h4 {
    color: #06283D;
    font-size: 13px;
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
    width: 16%;
    background-color: #06283D;
}

.side_barre i {
    color: white;
    margin: auto 10px;
    font-size: 25px;
}

.side_barre h3 {
    color: white;
    width: 100px;
    text-align: left;
    padding-left: 15px;
    font-family: Monda;
}

.extra {
    width: 40%;
    background-color: white;
    height: 94.6vh;
    /* Hauteur fixe du conteneur */
    overflow-y: auto;
    padding: 20px;
}

.page {
    margin-top: 20px;
    background-color: transparent;
    width: 100%;
    height: 100vh;
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

li:hover {
    cursor: pointer;
}

.head {
    width: 37.5%;
    position: fixed;
    top: 7px;
    background-color: #ffffff;
    z-index: 9999;
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
    height: 30px !important;
}
</style>