<template>
  <div>
    <div v-for="{ name, route } in tabs" :key="name">
      <router-link :to="route">{{ name }}</router-link>
    </div>
    <div class="relative">
      <div class="absolute background-tint inset-0" />
      <img src="/img/hero-image.jpg" class="object-cover hero-image w-full" />
      <div class="absolute inset-0 flex flex-col items-center justify-center">
        <div class="z-10 hero-title text-white font-kollektif">victoria park ci</div>
        <router-link class="z-10 bg-yellow-400 py-3 px-5 text-white" to="/clubs">
          explore
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

<style scoped>
.background-tint {
  background-color: rgba(255, 0, 0, 0.2);
}

.hero-image {
  top: 0;
  left: 0;
}

.hero-title {
  font-size: 10vw;
  text-align: center;
}

@media screen and (min-width: 1024px) {
  .hero-title {
    font-size: 7rem;
  }
}
</style>
