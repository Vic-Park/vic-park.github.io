<template>
  <Calendar class="custom-calendar max-w-full" :attributes="attributes" is-expanded>
    <template v-slot:day-content="{ day, attributes }">
      <div class="flex flex-col z-10 overflow-hidden h-28 px-4">
        <span class="day-label text-sm text-gray-900">{{ day.day }}</span>
        <div class="flex-grow overflow-y-auto overflow-x-auto">
          <template v-for="attr in attributes" :key="attr.key">
            <router-link :to="`/event/${attr.customData.slug}`">
              <div
                class="text-xs leading-tight rounded-sm p-1 mt-0 mb-1 hover:opacity-80"
                :class="attr.customData.class"
              >
                {{ attr.customData.title }}
                ({{ attr.customData.startTime }} - {{ attr.customData.endTime }})
              </div>
            </router-link>
          </template>
        </div>
      </div>
    </template>
  </Calendar>
</template>

<script lang="ts">
import { Calendar } from 'v-calendar';
import { computed, defineComponent } from 'vue';

import events from '~data/events';

export default defineComponent({
  components: { Calendar },
  setup() {
    const eventsArray = Object.values(events);
    const attributes = computed(() =>
      eventsArray.map(({ data }, index) => {
        const date = new Date(data.date);
        return {
          key: index,
          customData: {
            title: data.name,
            startTime: data.startTime,
            endTime: data.endTime,
            slug: data.slug,
            class: 'bg-red-600 text-white',
          },
          dates: date,
        };
      })
    );

    return {
      attributes,
    };
  },
});
</script>

<style lang="postcss" scoped></style>
