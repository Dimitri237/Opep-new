<template>
    <div class="all">
        <side_barre />
        <div class="container">
            <div class="head">
                <router-link to="/mesVehicules" class="new_car">
                    <img style="width: 50px; height: 50px; margin: auto 10px;" src="@/assets/icon (4).png" alt="">
                    <div style="margin: auto 10px; width: 500px;">
                        <h3>Dépenses liees au vehicule</h3>
                        <p style="margin-top: -20px; color: rgba(0, 0, 0, 0.2);">dépenses liees au vehicule selectionne</p>
                    </div>
                    
                </router-link>
                <h2 style="color: #06283D; display: flex;width: 100%;"><h2 style="font-size: 23px; width: 61%;">Somme totale des dépenses :</h2><span style="width: 39%; padding-right: 10px;"> {{ totalDepenses }}</span></h2>
            </div>
        


        <div v-if="loading" class="loading-indicator">
            <!-- Indicateur de chargement, vous pouvez personnaliser cet élément -->
        </div>
        <ul v-else>
            <li class="animate__animated animate__fadeInUp" v-for="depense in depenses" :key="depense.id">
                <h4>
                    <p>Type de dépense : </p><span> {{ depense.typeDepense }}</span>
                </h4>
                <h4 style="margin-top: -40px;">
                    <p>Montant : </p><span> {{ depense.montant }}</span>
                </h4>
                <h4 style="margin-top: -40px;">
                    <p>Description : </p><span>{{ depense.libelle }}</span>
                </h4>
                <h4 style="margin-top: -40px;">
                    <p>Date : </p><span>{{ depense.date }}</span>
                </h4>
            </li>
        </ul>
    </div>
    </div>
</template>
  
<script>
import { collection, getDocs, where, query} from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';
import side_barre from '@/components/layouts/side_barre.vue';

export default {
    components: {
        side_barre
  },
    data() {
        return {
            depenses: [],
            vehicles: [],
            loading: false
        };
    },
    mounted() {
        const vehicleId = this.$route.params.id;
        this.fetchDepenses(vehicleId);
        this.fetchVehicle(vehicleId);
        console.log('Valeur de this.$route.params.id:', this.$route.params.id);
    },
    computed: {
    // Calcul de la somme totale des dépenses
    totalDepenses() {
      return this.depenses.reduce((total, depense) => total + depense.montant, 0);
    }
  },
    methods: {
       
        async fetchDepenses(vehicleId) {
            try {
                this.loading = true;
                const q = query(collection(db, 'depenses'), where('vehicleId', '==', vehicleId));
                const querySnapshot = await getDocs(q);
                this.depenses = querySnapshot.docs.map((doc) => doc.data());
                this.loading = false;
            } catch (error) {
                console.error('Erreur lors de la récupération des dépenses :', error);
            }
        },
        async fetchVehicle(vehicleId) {
            try {
                const q = query(collection(db, 'vehicles'), where('vehicleId', '==', vehicleId));
                const querySnapshot = await getDocs(q);
                this.vehicles = querySnapshot.docs.map((doc) => doc.data());
                this.loading = false;// Stockage des informations du véhicule dans la propriété correspondante
            } catch (error) {
                console.error('Erreur lors de la récupération des informations du véhicule :', error);
            }
        },

    },
};
</script>
<style scoped>
@import url(https://fonts.googleapis.com/css2?family=Monda:wght@100;200;300;400;500;600;700&display=swap);

body {
    width: 100%;
    padding: 0;
    margin: 0;
    background-color: rgba(0, 0, 0, 0.5)!important;
    font-family: Monda;
}
.all {
    background-color: rgba(0, 0, 0, 0.05)!important;
    width: 100%;
    margin: 0;
    padding: 0;
    display: flex !important;
    font-family: Monda;
}
.detail {
    width: 95%;
    margin: auto;
}
h3 {
    color: #06283D;
}

p {
    color: #06283D;
    font-size: 12px;
}
.head {
    width: 37.5%;
    position: fixed;
    top: 7px;
    background-color: #ffffff;
    z-index: 9999;
}
.new_car {
    width: 100%;
    display: flex;
    text-decoration: none;
    justify-content: space-between;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
}

ul {
    justify-content: space-between;
    padding: 0;
    margin-top: 200px;
    width: 95%;
}

li {
    width: 100%;
    list-style: none;
    padding: 0 15px;
    border-radius: 15px;
    background-color: rgba(0, 0, 0, 0.05);
}

.container {
    width: 40%;
    margin-left: 5%;
    background-color: white;
    padding: 20px;
    height: 94.6vh;
    overflow-y: auto;
    font-family: Monda;
}
.container::-webkit-scrollbar {
    width: 0.1em;
    /* Largeur de la barre de défilement */
}
.container::-webkit-scrollbar-thumb {
    background-color: transparent;
    /* Couleur de la poignée de défilement */
}

h4 {
    font-size: 15px;
    color: #06283D;
    display: flex;
}

p {
    width: 50%;
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

span {
    color: #F2994A;
    font-weight: bold;
    margin: auto;
    width: 50%;
    text-align: right;
}
</style>