<template>
  <div class="splash-screen">
    <!-- Contenu du splash screen -->
    <img style="margin: auto;" src="@/assets/log1.png" alt="Logo" />
    <div class="loader">
      <div class="circle"></div>
      <div class="circle"></div>
      <div class="circle"></div>
      <div class="circle"></div>
      <div class="circle"></div>
      <div class="circle"></div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    // Cacher le splash screen après une durée spécifique
    setTimeout(() => {
      this.$router.push('/auth');
    }, 2000); // Durée en millisecondes (10 secondes dans cet exemple)
  },
};
</script>

<style scoped>
img {
  margin-left: 550px !important;
}

.splash-screen {
  /* Styles pour le conteneur du splash screen */
  background-color: #06283D !important;
  padding: auto;
  height: 100vh;
  /* Centrer le contenu, définir un fond, etc. */
}

/*chargement*/
.loader {
  height: 125px;
  margin: 50px auto;
  width: 125px;
  animation: spin 2s ease-in-out infinite;
}

.circle {
  position: absolute;
  width: 125px;
  height: 125px;
  background-color: white;
  mix-blend-mode: screen;
  border-radius: 50%;
  opacity: 0.75;
  animation: breath 7s ease-in-out infinite;
}

.circle:nth-child(1) {
  transform: translate(-35px, -50px);
  background-color: #F2994A;
}

.circle:nth-child(2) {
  transform: translate(35px, -50px);
  background-color: #2ecc71;
}

.circle:nth-child(3) {
  transform: translate(-60px, 0);
  background-color: #3498db;
}

.circle:nth-child(4) {
  transform: translate(60px, 0);
  background-color: #9b59b6;
}

.circle:nth-child(5) {
  transform: translate(-35px, 50px);
  background-color: #f1c40f;
}

.circle:nth-child(6) {
  transform: translate(35px, 50px);
  background-color: #e62284;
}

@keyframes spin {
  50% {
    filter: blur(360deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes breath {
  50% {
    transform: translateY(0px);
  }

}
</style>