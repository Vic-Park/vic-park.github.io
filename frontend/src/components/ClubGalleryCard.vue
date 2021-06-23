<template>
  <div class="flip-card">
    <div class="flip-card-inner w-full h-80 relative">
      <div class="flip-card-front absolute w-full h-full">
        <img
          :src="imgPath"
          onerror="this.onerror=null;this.src='/img/vic-park-logo.png'"
          :alt="name"
          class="w-full h-full"
        />
      </div>
      <div class="flip-card-back w-full h-full bg-white absolute text-burgundy text-center p-4">
        <h4 class="font-bold text-xl text-center mb-4">{{ name }}</h4>
        <p class="">{{ description }}</p>
        <div class="w-full my-auto">
          <a :href="clubPagePath" class="absolute bottom-6 left-0 right-0">
            <vue-icon :icon="mdiArrowRight" size="30px" class="mx-auto text-burgundy" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { mdiArrowRight } from '@mdi/js';
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
    slug: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const imgPath = `/img/club-thumbnail-img/${props.slug}.jpg`;
    const clubPagePath = `/club/${props.slug}`;
    return {
      imgPath,
      clubPagePath,
      mdiArrowRight,
    };
  },
});
</script>

<style scoped>
.flip-card {
  perspective: 1000px; /* Remove this if you don't want the 3D effect */
}

.flip-card-front,
.flip-card-back {
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
}

.flip-card-inner {
  transition: transform 0.8s;
  transform-style: preserve-3d;
  background-color: white;
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-back {
  transform: rotateY(180deg);
}
</style>
