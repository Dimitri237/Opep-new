import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import CreateAccount from '@/components/CreateAccount.vue';
import AuthentificationPage from '@/components/AuthentificationForm.vue';
import ajouterV from '@/components/ajouterV.vue';
import ajouterD from '@/components/ajouterD.vue';
//import LoadingPage from './components/LoadingPage.vue';
import MesVehicules from './components/mesVehicules.vue';
import detailsVehicule from './components/detailsVehicule.vue';

const routes = [
  { path: '/', component: CreateAccount },
  //{ path: '/LoadingPage', component: LoadingPage },
  { path: '/auth', component: AuthentificationPage },
  { path: '/ajouterV', component: ajouterV },
  { path: '/ajouterD', component: ajouterD },
  { path: '/MesVehicules', component: MesVehicules },
  { path: '/detailsVehicule/:id', component: detailsVehicule },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

const app = createApp(App);
app.use(router);
app.mount('#app');

