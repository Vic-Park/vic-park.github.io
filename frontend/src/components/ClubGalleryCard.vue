<template>
  <div class="flip-card" @click="onClick">
    <div class="flip-card-inner w-full h-80 relative" :style="cardStyle">
      <div class="flip-card-front absolute w-full h-full" :style="frontCardStyle">
        <div v-if="clubHasImage" class="w-full h-full relative flex flex-col items-center">
          <img
            class="absolute w-full h-full object-cover object-center"
            :src="imgPath"
            @error="onImageLoadError"
            :alt="name"
          />
          <div
            class="
              font-bold
              rounded-md
              m-2
              py-1
              px-4
              text-center
              inline-block
              transform 
              bg-white
              text-black
              border-2
              border-black
              "
          >
            {{ name }}
          </div>
        </div>
        <div
          v-else
          class="
            font-bold 
            text-4xl 
            text-center 
            transform 
            -translate-x-1/2 
            -translate-y-1/2 
            absolute 
            top-1/2 left-1/2 
            p-8 
            w-full
            flex
            flex-col
            items-center
            "
        >
          {{ name }}
          <img src="/img/vic-park-logo.png" width="150" />
        </div>
      </div>
      <div class="flip-card-back w-full h-full bg-white absolute text-burgundy text-center p-4">
        <h4 class="font-black uppercase text-xl text-center mb-2">{{ name }}</h4>
        <p class="text-md">{{ description }}</p>
        <div class="w-full my-auto">
          <router-link :to="clubPagePath" class="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <vue-icon
              :icon="mdiArrowRight"
              size="30px"
              class="hover:text-burgundy text-yellow"
              @click.stop
            />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { mdiArrowRight } from '@mdi/js';
import { defineComponent, ref, computed } from 'vue';
import * as CSS from 'csstype';

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
    const isDescriptionActive = ref(false);
    const clubHasImage = ref(true);

    const cardStyle = computed(() => ({
      transform: isDescriptionActive.value ? 'rotateY(180deg)' : undefined,
    }));

    const frontCardStyle = computed<CSS.Properties>(() => ({
      pointerEvents: isDescriptionActive.value ? 'none' : 'auto',
    }));

    function onClick() {
      isDescriptionActive.value = !isDescriptionActive.value;
    }

    function onImageLoadError(event: Event) {
      event.preventDefault();
      clubHasImage.value = false;
    }

    const imgPath = `/img/club-thumbnail-img/${props.slug}.jpg`;
    const clubPagePath = `/club/${props.slug}`;

    return {
      imgPath,
      clubPagePath,
      mdiArrowRight,
      clubHasImage,
      onImageLoadError,
      isDescriptionActive,
      onClick,
      cardStyle,
      frontCardStyle,
    };
  },
});
</script>

<style scoped>
.flip-card {
  perspective: 1000px;
}
at Victoria Park Collegiate Institute .flip-card-front,
.flip-card-back {
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
}

.flip-card-inner {
  cursor: pointer;
  transition: transform 0.5s;
  transform-style: preserve-3d;
  background-color: white;
}

.flip-card-back {
  position: absolute;
  transform: rotateY(180deg);
}
</style>
