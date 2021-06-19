<template>
  <div class="flip-card flex-auto w-80 h-80 m-auto">
    <div class="flip-card-inner w-full h-full relative">
      <div class="flip-card-front absolute w-full h-full">
        <img src="'/img/' + clubname + '.jpg'" :alt="name" class="w-full h-full" />
      </div>
      <div class="flip-card-back w-full h-full bg-white absolute text-red-700 text-center p-4">
        <h4 class="font-bold text-xl text-center mb-4">{{ name }}</h4>
        <p>{{ description }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.flip-card {
  perspective: 1000px; /* Remove this if you don't want the 3D effect */
}

.flip-card-inner {
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
}

.flip-card-back {
  transform: rotateY(180deg);
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    clubname: {
      type: String,
      required: true,
    },
  },
});
</script>
