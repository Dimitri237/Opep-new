<template>
  <div class="container monda-font animate__animated animate__fadeInDown">
    <nav>
      <img src="@/assets/log2.png" alt="" />
    </nav>
    <div>
      <h2 class="monda-font">Inscription</h2>
      <p class="stext monda-font">Retrouver l’activité de vos véhicules dans un seul <br> endroit</p>
    </div>
    <form @submit.prevent="createAccount">
      <div class="input-field">
        <div> <label for="name">Nom</label></div>
        <input type="text" id="name" v-model="name" required>
      </div>
      <div class="input-field">
        <div> <label for="telephone">Telephone/Email</label></div>
        <input id="contact" v-model="contact" required>
      </div>
      <div class="input-field">
        <div><label for="password">Mot de passe:</label></div>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button class="btn" type="submit" :disabled="loading">
        <span class="loading-indicator" v-if="loading"></span>
        <span v-else>Inscription</span>
      </button>
    </form>
    <p class="pas">Vous avez déjà un compte? <router-link to="/auth">Connexion</router-link></p>
  </div>
</template>
<script>
import { uuid } from 'vue-uuid';
import bcryptjs from 'bcryptjs';
import { firestore } from '@/config/firebaseConfig';
import { setDoc, doc } from 'firebase/firestore';


export default {
  data() {
    return {
      name: "",
      contact: "",
      password: "",
      loading: false,
      currentUserID: null
    };
  },
  methods: {
    createAccount() {
      this.loading = true;
      // Créer un compte utilisateur avec l'email et le mot de passe
      const saltRounds = 10;
      //const salt = randomBytes(16).toString('hex');
      const hashedPassword = bcryptjs.hashSync(this.password, saltRounds);
      console.log('Mot de passe haché :', hashedPassword);
      // Succès de la création du compte, vous pouvez enregistrer les autres données dans Firebase Firestore
      // Enregistrer les autres données dans Firestore
      const user = {
        name: this.name,
        contact: this.contact,
        password: hashedPassword,
        _id: uuid.v4(),
      };


      setDoc(doc(firestore, 'users', user._id), { ...user })
        .then(() => {
          // Données enregistrées avec succès
          this.$router.push("/auth");
        })
        .catch((error) => {
          // Gérer les erreurs lors de l'enregistrement des données
          console.error("Error writing document: ", error);
        })
        .finally(() => {
          this.loading = false; // Mettre loading à false une fois la connexion terminée (succès ou échec)
        });

    },
  },
};
</script>

<style scoped>
h2 {
  font-size: 25px;
  font-weight: bold;
  color: rgba(6, 40, 61, 1);
}

.stext {
  color: rgba(0, 0, 0, 0.2);
  font-size: 13px;
  margin-top: -20px;
}

.container {
  text-align: left;
  width: 450px;
  margin: auto;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  padding: 15px;
  margin-top: 100px;
}

form {
  width: 100%;
  margin-top: 20px;
}

.monda-font {
  font-family: 'Monda', sans-serif;
}

.input-field {}

input {
  width: 98%;
  height: 30px;
  border: none;
  background: transparent;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  outline: none;
  margin-top: 5px;

}

input:nth-child(2) {
  margin-bottom: 20px;
}

label {
  font-weight: 700;
  font-size: 16px;
  color: rgba(6, 40, 61, 1);

}

.mot {
  color: rgba(6, 40, 61, 1);
  font-weight: 500;
  font-size: 15px;
}

.btn {
  margin-top: 20px;
  font-size: 17px;
  background: rgba(51, 167, 226, 1);
  border: none;
  width: 100%;
  border-radius: 10px;
  height: 35px;
  color: white;
}

.pas {
  font-weight: 700;
  color: rgba(6, 40, 61, 1);
  font-size: 14px;
}

.pas a {
  text-decoration: none;
  color: rgb(214, 106, 5);
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
</style>