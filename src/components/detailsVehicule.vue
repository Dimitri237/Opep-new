<template>
    <div>
        <h3>Dépenses liées au véhicule :</h3>
        <ul>
            <li v-for="depense in depenses" :key="depense.id">
                <p>Type de dépense : {{ depense.typeDepense }}</p>
                <p>Montant : {{ depense.montant }}</p>
                <p>Description : {{ depense.libelle }}</p>
                <p>Date : {{ depense.date }}</p>
            </li>
        </ul>
    </div>
</template>
  
<script>
import { firebaseConfig } from '@/config/firebaseConfig';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, where, query } from 'firebase/firestore';

// Initialisation de l'application Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export default {
    data() {
        return {
            depenses: [],
        };
    },
    mounted() {
        const vehicleId = this.$route.params.id;
        this.fetchDepenses(vehicleId);
        console.log('Valeur de this.$route.params.id:', this.$route.params.id);
    },
    methods: {
        async fetchDepenses(vehicleId) {
            try {
                const q = query(collection(db, 'depenses'), where('vehicleId', '==', vehicleId));
                const querySnapshot = await getDocs(q);
                this.depenses = querySnapshot.docs.map((doc) => doc.data());
            } catch (error) {
                console.error('Erreur lors de la récupération des dépenses :', error);
            }
        },
    },
};
</script>