<template>
    <div class="side_barre">

        <nav style="width: 100%;">
            <center>
                <img style="width: 100px;" src="@/assets/log1.png" alt="" />
            </center>


            <ul style="margin-top: 40px;">
                <li>
                    <button class="butt" :class="{ selected: currentPage === 'home' }" style="display: flex;text-decoration: none;"
                        @click="showPage('home')">
                        <i :style="{ color: currentPage === 'home' ? '#06283dc9' : 'white' }" class="fas fa-home"></i>
                        <h3 :style="{ color: currentPage === 'home' ? '#06283dc9' : 'white' }">Accueil</h3>
                    </button>
                </li>
                <li>
                    <button class="butt" :class="{ selected: currentPage === 'depense' }" style="display: flex;text-decoration: none;"
                        @click="showPage('depense')">
                        <i :style="{ color: currentPage === 'depense' ? '#06283dc9' : 'white' }"
                            class="fas fa-layer-group"></i>
                        <h3 :style="{ color: currentPage === 'depense' ? '#06283dc9' : 'white' }">Dépenses</h3>
                    </button>
                </li>
                <li>
                    <button class="butt" :class="{ selected: currentPage === 'stats' }" style="display: flex;text-decoration: none;"
                        @click="showPage('stats')">
                        <i :style="{ color: currentPage === 'stats' ? '#06283dc9' : 'white' }" class="fas fa-chart-bar"></i>
                        <h3 :style="{ color: currentPage === 'stats' ? '#06283dc9' : 'white' }">Statistiques</h3>
                    </button>
                </li>
                <li>
                    <button class="butt" :class="{ selected: currentPage === 'profil' }" style="display: flex;text-decoration: none;"
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
                    <img src="@/assets/toyota.png" alt="image 1">
                </div>

            </div>
        </div>

        <div style=" width: 100%;" class="page" v-if="currentPage === 'depense'">
            <div class="head">
                <router-link style="margin: auto;" to="/ajouterD" class="new_car">
                    <img style="width: 50px; height: 50px; margin: auto 10px;" src="@/assets/icon (4).png" alt="">
                    <div style="margin: auto 10px; width: 500px;">
                        <h3>Ajouter une dépense</h3>
                        <p style="margin-top: -20px;">Ajouter une dépense maintenant </p>
                    </div>
                    <img style="width: 25px; height: 25px; margin: auto 10px;" src="@/assets/arrow-right.png" alt="">
                </router-link>
            </div>

            <!-- <div style="margin-top: 100px; width: 100%;">
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
            </div> -->
            <div style="margin-top: 100px;">
                <div>
                    <div style="display: flex; justify-content: space-between; width: 100%; margin: auto;">
                        <button class="bDate" @click="selectButton('button1')"
                            :class="{ active: selectedButton === 'button1' }">Cette semaine</button>
                        <button class="bDate" @click="selectButton('button2')"
                            :class="{ active: selectedButton === 'button2' }">Ce mois</button>
                        <button class="bDate" @click="selectButton('button3')"
                            :class="{ active: selectedButton === 'button3' }">Cette annee</button>
                    </div>

                    <div v-if="selectedButton === 'button1'">
                        <ul style="margin-top: 50px;">
                            <li class="animate__animated animate__fadeInDown" style="margin-top: 20px; display: flex; border-bottom: 1px solid rgba(0, 0, 0, 0.3); justify-content: space-between; padding: 10px 0;" v-for="depense in depensesByWeek" :key="depense._id">
                                <span style="font-weight: bold; color: #06283D;">{{ depense.description }}</span>
                                <span style="color: #F2994A; font-weight: bold;">{{ depense.montant }}</span>
                            </li>
                        </ul>
                    </div>
                    <div v-if="selectedButton === 'button2'">
                        <ul  style="margin-top: 50px;">
                            <li class="animate__animated animate__fadeInDown" style="margin-top: 20px; display: flex; border-bottom: 1px solid rgba(0, 0, 0, 0.3); justify-content: space-between; padding: 10px 0;" v-for="depense in depensesByMonth" :key="depense._id">
                                <span style="font-weight: bold; color: #06283D;">{{ depense.description }}</span>
                                <span style="color: #F2994A; font-weight: bold;">{{ depense.montant }}</span>
                            </li>
                        </ul>
                    </div>
                    <div v-if="selectedButton === 'button3'">
                        <ul  style="margin-top: 50px;">
                            <li class="animate__animated animate__fadeInDown" style="margin-top: 20px; display: flex; border-bottom: 1px solid rgba(0, 0, 0, 0.3); justify-content: space-between; padding: 10px 0;" v-for="depense in depensesByYear" :key="depense._id">
                                <span style="font-weight: bold; color: #06283D;">{{ depense.description }}</span>
                                <span style="color: #F2994A; font-weight: bold;">{{ depense.montant }}</span>
                            </li>
                        </ul>
                    </div>
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
                    <img style="width: 60px; margin-top: 10px; border-radius: 50%; height: 60px;"
                        :src="currentUser.images[0].url" alt="photoProfil" />
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
import { TABLE } from '@/config/constantes/tables.js';
import { db } from '@/config/firebaseConfig';
import moment from 'moment';

export default {

    components: {
    },
    data() {
        return {
            selectedButton: null,
            isAuthenticated: false,
            currentPage: 'depense',
            userId: null,
            vehicleId: null,
            typeDepenses: [],
            vehicles: [],
            currentUser: null, // Variable pour stocker les informations de l'utilisateur connecté

            idTypeDepense: null,
            moisActuel: new Date().getMonth(),
            depensesByWeek: [],
            depensesByMonth: [],
            depensesByYear: [],
            loading: false
        };
    },
    mounted() {
        try {
            this.fetchDepensesByWeek();
            this.fetchDepensesByMonth();
            this.fetchDepensesByYear();
            this.fetchCurrentUser();
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
    methods: {
        selectButton(button) {
            this.selectedButton = button;
        },
        async fetchDepensesByWeek() {
            try {

                var vehicleIds = localStorage.getItem('vehicleIds');
                if (vehicleIds) {
                    vehicleIds = JSON.parse(vehicleIds);
                    const startDate = moment().startOf('week').format(); // Début de la semaine en cours
                    const endDate = moment().endOf('week').format(); // Fin de la semaine en cours

                    const depensesRef = collection(db, TABLE.DEPENSE)
                    const q = query(
                        depensesRef, where('vehiculeId', 'in', vehicleIds),
                        where('date', '>=', startDate), where('date', '<=', endDate)
                    );
                    const depensesQuerySnapshot = await getDocs(q)
                    // 

                    this.depensesByWeek = depensesQuerySnapshot.docs.map(doc => doc.data());
                    console.log({ depenses: this.depensesByWeek });
                }


            } catch (error) {
                console.error('Erreur lors de la récupération des dépenses par semaine :', error);
            }
        },
        async fetchDepensesByMonth() {
            try {

                var vehicleIds = localStorage.getItem('vehicleIds');
                if (vehicleIds) {
                    vehicleIds = JSON.parse(vehicleIds);
                    const startDate = moment().startOf('month').format(); // Début de la semaine en cours
                    const endDate = moment().endOf('month').format(); // Fin de la semaine en cours

                    const depensesRef = collection(db, TABLE.DEPENSE)
                    const q = query(
                        depensesRef, where('vehiculeId', 'in', vehicleIds),
                        where('date', '>=', startDate), where('date', '<=', endDate)
                    );
                    const depensesQuerySnapshot = await getDocs(q)
                    // 

                    this.depensesByMonth = depensesQuerySnapshot.docs.map(doc => doc.data());
                    console.log({ depenses: this.depensesByMonth });
                }


            } catch (error) {
                console.error('Erreur lors de la récupération des dépenses par mois :', error);
            }
        },
        async fetchDepensesByYear() {
            try {

                var vehicleIds = localStorage.getItem('vehicleIds');
                if (vehicleIds) {
                    vehicleIds = JSON.parse(vehicleIds);
                    const startDate = moment().startOf('Year').format(); // Début de la semaine en cours
                    const endDate = moment().endOf('Year').format(); // Fin de la semaine en cours

                    const depensesRef = collection(db, TABLE.DEPENSE)
                    const q = query(
                        depensesRef, where('vehiculeId', 'in', vehicleIds),
                        where('date', '>=', startDate), where('date', '<=', endDate)
                    );
                    const depensesQuerySnapshot = await getDocs(q)
                    // 

                    this.depensesByYear = depensesQuerySnapshot.docs.map(doc => doc.data());
                    console.log({ depenses: this.depensesByYear });
                }


            } catch (error) {
                console.error('Erreur lors de la récupération des dépenses par annee :', error);
            }
        },

        getUserIdFromLocalStorage() {
            return localStorage.getItem('userId');
        },
        async fetchCurrentUser() {
            const userId = localStorage.getItem('userId'); // Récupérer l'ID de l'utilisateur connecté depuis le localStorage

            const usersRef = collection(db, TABLE.USER);
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

.bDate {
    width: 25%;
    text-align: center;
    padding: 5px 10px;
    border-radius: 50px;
    color: rgba(0, 0, 0, 0.3);
    background-color: transparent;
    border: none;
    font-weight: bold;
    font-size: 15px;
}

button.active {
    background-color: rgba(0, 0, 0, 0.1);
    color: #06283dab;
}

.bDate:hover {
    cursor: pointer;
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

.men {
    display: inline;
    margin-right: 10px;
}

.dMois li:hover {
    background: transparent !important;

}

.dMois li {
    transition: all 0.3s;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);

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

.butt {
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
    height: 300px;
    border-radius: 15px;
    display: flex;
    flex-wrap: nowrap;
    overflow: hidden;
    animation: scrollGallery 10s linear infinite;
}

@keyframes scrollGallery {
    0% {
        transform: translateX(0);
    }

    100% {
        transform: translateX(-100%);
    }
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

.profil2 {
    display: flex;
    margin-top: -15px;
}

.profil2 img {
    border: 6px solid white;
    border-radius: 50%;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
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
}</style>