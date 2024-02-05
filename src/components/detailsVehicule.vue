<template>
    <div class="detail">
        <h3>Dépenses liées au véhicule</h3>
        <div v-for="vehicle in vehicles" :key="vehicle.id">
            <h2>{{ vehicle.marque }} {{ vehicle.modele }}</h2>

        </div>


        <div v-if="loading" class="loading-indicator">
            <!-- Indicateur de chargement, vous pouvez personnaliser cet élément -->
        </div>
        <ul v-else>
            <li v-for="depense in depenses" :key="depense.id">
                <h4>
                    <p>Type de dépense : </p><span> {{ depense.typeDepense }}</span>
                </h4>
                <h4>
                    <p>Montant : </p><span> {{ depense.montant }}</span>
                </h4>
                <h4>
                    <p>Description : </p><span>{{ depense.libelle }}</span>
                </h4>
                <h4>
                    <p>Date : </p><span>{{ depense.date }}</span>
                </h4>
            </li>
        </ul>
    </div>
</template>
  
<script>
import { firebaseConfig } from '@/config/firebaseConfig';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, where, query} from 'firebase/firestore';

// Initialisation de l'application Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export default {
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
.detail {
    width: 95%;
    margin: auto;
}

h3 {
    color: #06283D;
    width: 50%;
    font-size: 30px;
    padding: 10px 0;
    margin: 30px auto;
    border-radius: 50px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
    text-align: center;
}

ul {
    display: flex;
    padding: 0;
}

li {
    width: 17%;
    list-style: none;
    margin-left: 25px;
    padding: 0 15px;
    border-radius: 15px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
    transition: all 0.3s;
}

li:hover {
    transform: scale(1.1);
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