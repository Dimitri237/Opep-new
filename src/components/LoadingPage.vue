<template>
    <div class="splash-screen" :class="{ 'fade-out': hideSplashScreen }">
        <div class="splash-content">
       <center>
        <img class="animate__animated animate__fadeInLeft"  src="@/assets/log1.png" alt="" />
       </center>
       </div>
    </div>
</template>


<script>
export default {
  name: 'LoadingPage'
  
}
</script>

<style scoped>
body{
    width: 100%; 
    padding: 0;
    margin: 0;  
    background: rgba(6, 40, 61, 1)!important;

}
img{
    width: 250px!important;
    margin-top: 250px;
}

.splash-screen {   
    transition: opacity 0.5s;
  }
  
  .fade-out {
    opacity: 0;
  }
</style>