<template>
    <div class="side_barre">

        <nav style="width: 100%;">
            <center>
                <img style="width: 100px;" src="@/assets/log1.png" alt="" />
            </center>


            <ul style="margin-top: 40px;">
                <li>
                    <button class="butt" :class="{ selected: currentPage === 'home' }"
                        style="display: flex;text-decoration: none;" @click="showPage('home')">
                        <i :style="{ color: currentPage === 'home' ? '#06283dc9' : 'white' }" class="fas fa-home"></i>
                        <h3 :style="{ color: currentPage === 'home' ? '#06283dc9' : 'white' }">Accueil</h3>
                    </button>
                </li>
                <li>
                    <button class="butt" :class="{ selected: currentPage === 'depense' }"
                        style="display: flex;text-decoration: none;" @click="showPage('depense')">
                        <i :style="{ color: currentPage === 'depense' ? '#06283dc9' : 'white' }"
                            class="fas fa-layer-group"></i>
                        <h3 :style="{ color: currentPage === 'depense' ? '#06283dc9' : 'white' }">Dépenses</h3>
                    </button>
                </li>
                <li>
                    <button class="butt" :class="{ selected: currentPage === 'stats' }"
                        style="display: flex;text-decoration: none;" @click="showPage('stats')">
                        <i :style="{ color: currentPage === 'stats' ? '#06283dc9' : 'white' }"
                            class="fas fa-chart-bar"></i>
                        <h3 :style="{ color: currentPage === 'stats' ? '#06283dc9' : 'white' }">Statistiques</h3>
                    </button>
                </li>
                <li>
                    <button class="butt" :class="{ selected: currentPage === 'profil' }"
                        style="display: flex;text-decoration: none;" @click="showPage('profil')">
                        <i :style="{ color: currentPage === 'profil' ? '#06283dc9' : 'white' }" class="fa fa-user"></i>
                        <h3 :style="{ color: currentPage === 'profil' ? '#06283dc9' : 'white' }">Profil</h3>
                    </button>
                </li>
            </ul>
        </nav>
    </div>
    <div class="extra">

        <div style="margin-top: -14px;" class="page" v-if="currentPage === 'home'">

            <div class="cont">
                <div class="cont1 ">

                    <img style="width: 70%;" src="@/assets/toyota.png" alt="image 1">
                    <h1 class="animate__animated animate__fadeInUp"
                        style="color: white; font-size: 26px; width: 70%; margin-top: 90px;">Ravis de vous revoir
                        Mr. <span style=" color: #F2994A;">{{ currentUser ? currentUser.name : '' }}</span></h1>
                </div>
                <div style="width: 100%; margin-top: 20px;">
                    <div class="img-container" style="width: 100%;">
                        <div v-for="vehicle in vehicles" :key="vehicle.id"
                            class="lists animate__animated animate__fadeInUp">
                            <img v-for="image in vehicle.images" :key="image.id" :src="image.url" alt="image 1">
                            <div>
                                <h1 style="font-size: 16px;">{{ vehicle.marque.libelle }} {{ vehicle.model.libelle }}
                                    <span style=" color: #F2994A;">MT-</span> {{ vehicle._id }}</h1>
                                <h3></h3>
                                <p></p>
                            </div>
                        </div>
                        <!-- <div class="lists animate__animated animate__fadeInUp">
                            <img src="@/assets/day-exterior-4.png" alt="image 1">
                            <div>
                                <h1></h1>
                                <h3></h3>
                                <p></p>
                            </div>
                        </div>
                        <div class="lists animate__animated animate__fadeInUp">
                            <img src="@/assets/car.png" alt="image 1">
                            <div>
                                <h1></h1>
                                <h3></h3>
                                <p></p>
                            </div>
                        </div>
                        <div class="lists animate__animated animate__fadeInUp">
                            <img src="@/assets/c17c68f3853160d844721a9676dc29e9.png" alt="image 1">
                            <div>
                                <h1></h1>
                                <h3></h3>
                                <p></p>
                            </div>
                        </div> -->
                    </div>

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


            <div style="margin-top: 100px;">
                <div>
                    <div style="display: flex; justify-content: space-between; width: 100%; margin: auto;">
                        <button class="bDate" @click="selectButton('button4')"
                            :class="{ active: selectedButton === 'button4' }">Aujourd'hui</button>
                        <button class="bDate" @click="selectButton('button1')"
                            :class="{ active: selectedButton === 'button1' }">Cette semaine</button>
                        <button class="bDate" @click="selectButton('button2')"
                            :class="{ active: selectedButton === 'button2' }">Ce mois</button>
                        <button class="bDate" @click="selectButton('button3')"
                            :class="{ active: selectedButton === 'button3' }">Cette annee</button>
                    </div>

                    <div v-if="selectedButton === 'button4'">
                        <ul style="margin-top: 50px;">
                            <li class="animate__animated animate__fadeInDown"
                                style="margin-top: 20px; display: flex;  justify-content: space-between; padding: 10px 0;"
                                v-for="depense in depensesByDay" :key="depense._id">
                                <span style="font-weight: bold; color: #06283da8;">{{ depense.description }}</span>
                                <span style="color: #F2994A; font-weight: bold;">{{ formatNumber(depense.montant)
                                    }}</span>
                            </li>
                        </ul>
                    </div>
                    <div v-if="selectedButton === 'button1'">
                        <ul style="margin-top: 50px;">
                            <li class="animate__animated animate__fadeInDown"
                                style="margin-top: 20px; display: flex; justify-content: space-between; padding: 10px 0;"
                                v-for="depense in depensesByWeek" :key="depense._id">
                                <span style="font-weight: bold; color: #06283da8;">{{ depense.description }}</span>
                                <span style="color: #F2994A; font-weight: bold;">{{ formatNumber(depense.montant)
                                    }}</span>
                            </li>
                        </ul>
                    </div>
                    <div v-if="selectedButton === 'button2'">
                        <ul style="margin-top: 50px;">
                            <li class="animate__animated animate__fadeInDown"
                                style="margin-top: 20px; display: flex; justify-content: space-between; padding: 10px 0;"
                                v-for="depense in depensesByMonth" :key="depense._id">
                                <span style="font-weight: bold; color: #06283da8;">{{ depense.description }}</span>
                                <span style="color: #F2994A; font-weight: bold;">{{ formatNumber(depense.montant)
                                    }}</span>
                            </li>
                        </ul>
                    </div>
                    <div v-if="loading" class="loading-indicator">
                        <!-- Indicateur de chargement, vous pouvez personnaliser cet élément -->
                    </div>
                    <div v-else>
                        <div v-if="selectedButton === 'button3'">
                            <ul style="margin-top: 50px;">
                                <li class="animate__animated animate__fadeInDown"
                                    style="margin-top: 20px; display: flex;  justify-content: space-between; padding: 10px 0;"
                                    v-for="depense in depensesByYear" :key="depense._id">
                                    <span style="font-weight: bold; color: #06283da8;">{{ depense.description }}</span>
                                    <span style="color: #F2994A; font-weight: bold;">{{ formatNumber(depense.montant)
                                        }}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <div class="page" v-if="currentPage === 'stats'">
            <div class="simple-bar-chart">
                <div class="item" style="--clr: #F8821A; --val: 100">
                    <div class="label">Tous</div>
                    <div class="value">100%</div>
                </div>

                <div class="item" style="--clr: #5EB344; --val: 80">
                    <div class="label">Citroen 300</div>
                    <div class="value">80%</div>
                </div>

                <div class="item" style="--clr: #FCB72A; --val: 50">
                    <div class="label">Suziki M10</div>
                    <div class="value">50%</div>
                </div>


                <div class="item" style="--clr: #E0393E; --val: 15">
                    <div class="label">Pajero 404</div>
                    <div class="value">15%</div>
                </div>

                <div class="item" style="--clr: #963D97; --val: 1">
                    <div class="label">Toyota Hilux</div>
                    <div class="value">1%</div>
                </div>

                <div class="item" style="--clr: #069CDB; --val: 90">
                    <div class="label">Lexux AVG</div>
                    <div class="value">90%</div>
                </div>
            </div>
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
                            <img style="width: 30px;  margin: auto 0px;" src="@/assets/help-circle.png" alt="">
                            <span>A propos de nous</span>
                        </li>
                        <li>
                            <img style="width: 30px;  margin: auto 0px;" src="@/assets/sun.png" alt="">
                            <span>Theme</span>
                        </li>
                        <li>
                            <img style="width: 30px;  margin: auto 0px;" src="@/assets/log-out.png" alt="">
                            <span @click="logout">Deconnexion</span>
                        </li>
                        <li>
                            <img style="width: 30px;  margin: auto 0px;" src="@/assets/scroll.png" alt="">
                            <span>Politique de confidentialite</span>
                        </li>
                        <li>
                            <img style="width: 30px;  margin: auto 0px;" src="@/assets/newspaper.png" alt="">
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
            isAuthenticated: false,
            currentPage: 'home',
            selectedButton: 'button4',
            userId: null,
            vehicleId: null,
            typeDepenses: [],
            vehicles: [],
            currentUser: null,
            idTypeDepense: null,
            moisActuel: new Date().getMonth(),
            depensesByWeek: [],
            depensesByDay: [],
            depensesByMonth: [],
            depensesByYear: [],
            loading: false
        };
    },
    mounted() {
        try {
            this.fetchDepensesByWeek();
            this.fetchDepensesByDay();
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
            this.getVehicles();
        }
    },
    methods: {
        async getVehicles() {
            try {
                this.loading = true;
                // Création d'une requête filtrée pour récupérer les voitures de l'utilisateur connecté
                const vehiclesRef = collection(db, TABLE.CAR);
                const q = query(vehiclesRef, where('userId', '==', this.userId));
                const querySnapshot = await getDocs(q);

                this.vehicles = querySnapshot.docs.map((doc) => doc.data());
                this.loading = false; // Fin du chargement
                // Stocker les véhicules dans le localStorage
                localStorage.setItem('vehicleIds', JSON.stringify(this.vehicles.map((vehicle) => vehicle._id)));
                localStorage.setItem('isAuthenticated', true);
                // Pour chaque véhicule, récupérer les dépenses associées
                this.vehicles.forEach((vehicle) => {
                    this.fetchDepenses(vehicle._id);
                });
            } catch (error) {
                console.error('Erreur lors de la récupération des véhicules :', error);
            }
        },
        formatNumber(number) {
            const formattedNumber = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            return formattedNumber;
        },
        selectButton(button) {
            this.selectedButton = button;
        },
        async fetchDepensesByWeek() {
            try {
                this.loading = true;
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
                }

                this.loading = false;
            } catch (error) {
                console.error('Erreur lors de la récupération des dépenses par semaine :', error);
            }
        },
        async fetchDepensesByDay() {
            try {
                this.loading = true;
                var vehicleIds = localStorage.getItem('vehicleIds');
                if (vehicleIds) {
                    vehicleIds = JSON.parse(vehicleIds);
                    const startDate = moment().startOf('day').format(); // Début de la semaine en cours
                    const endDate = moment().endOf('day').format(); // Fin de la semaine en cours

                    const depensesRef = collection(db, TABLE.DEPENSE)
                    const q = query(
                        depensesRef, where('vehiculeId', 'in', vehicleIds),
                        where('date', '>=', startDate), where('date', '<=', endDate)
                    );
                    const depensesQuerySnapshot = await getDocs(q)
                    // 

                    this.depensesByDay = depensesQuerySnapshot.docs.map(doc => doc.data());
                }

                this.loading = false;
            } catch (error) {
                console.error('Erreur lors de la récupération des dépenses par semaine :', error);
            }
        },
        async fetchDepensesByMonth() {
            try {
                this.loading = true;
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
                }

                this.loading = false;
            } catch (error) {
                console.error('Erreur lors de la récupération des dépenses par mois :', error);
            }
        },
        async fetchDepensesByYear() {
            try {
                this.loading = true;
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
                }
                this.loading = false;

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

.animate__fadeInDown {
    background-color: rgba(0, 0, 0, 0.1);
    padding: 10px 10px !important;
    border-radius: 15px;
}

.cont1 {
    width: 100%;
    height: 300px;
    border-radius: 15px;
    display: flex;
    flex-wrap: nowrap;
    background-color: #06283D;
    overflow: hidden;
}

/* animation: scrollGallery 10s linear infinite;


@keyframes scrollGallery {
    0% {
        transform: translateX(0);
    }

    100% {
        transform: translateX(-100%);
    }
}
*/
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

.img-container {
    width: 100%;
    margin-top: 5px;
}

.lists {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 15px;
}

.lists img {
    border-radius: 15px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    width: 40%;
    margin-top: 15px;
    height: 150px;
}

.lists img:nth-child(2) {
    border: 1px solid black;
    display: none;
}

.lists img:nth-child(3) {
    display: none;
}

.lists div {
    width: 55%;
    margin-top: 15px;
}

.lists h1 {
    width: 95%;
    background-color: #06283D;
    color: white;
    border-radius: 50px;
    padding-left: 5%;
    margin-top: 15px;
}

.lists h3 {
    width: 80%;
    background-color: #06283d98;
    height: 14px;
    border-radius: 50px;
}

.lists p {
    width: 70%;
    background-color: #06283d48;
    height: 12px;
    border-radius: 50px;
}

.list li img {
    height: 30px !important;
}

/*Statistique*/
.simple-bar-chart {
    --line-count: 10;
    --line-color: currentcolor;
    --line-opacity: 0.25;
    --item-gap: 2%;
    --item-default-color: #060606;

    height: 10rem;
    display: grid;
    grid-auto-flow: column;
    gap: var(--item-gap);
    align-items: end;
    padding-inline: var(--item-gap);
    --padding-block: 1.5rem;
    /*space for labels*/
    padding-block: var(--padding-block);
    position: relative;
    isolation: isolate;
}

.simple-bar-chart::after {
    content: "";
    position: absolute;
    inset: var(--padding-block) 0;
    z-index: -1;
    --line-width: 1px;
    --line-spacing: calc(100% / var(--line-count));
    background-image: repeating-linear-gradient(to top, transparent 0 calc(var(--line-spacing) - var(--line-width)), var(--line-color) 0 var(--line-spacing));
    box-shadow: 0 var(--line-width) 0 var(--line-color);
    opacity: var(--line-opacity);
}

.simple-bar-chart>.item {
    height: calc(1% * var(--val));
    background-color: var(--clr, var(--item-default-color));
    position: relative;
    animation: item-height 1s ease forwards
}

@keyframes item-height {
    from {
        height: 0
    }
}

.simple-bar-chart>.item>* {
    position: absolute;
    text-align: center
}

.simple-bar-chart>.item>.label {
    inset: 100% 0 auto 0
}

.simple-bar-chart>.item>.value {
    inset: auto 0 100% 0
}

/* demo */
body {
    margin: 0;
    padding: 2rem;
    color: #1D1E22;
    background-color: #f0f0f0;
    font-family: system-ui, sans-serif;
    text-align: center;
}

@media (prefers-color-scheme: dark) {
    body {
        background-color: #1D1E22;
        color: #f0f0f0;
    }
}

body>* {
    max-width: 45rem;
    margin-inline: auto
}
</style>