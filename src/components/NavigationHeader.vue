<template>
  <div class="sticky top-0 flex flex-row justify-between p-4 bg-gray-100">
    <router-link to="/">
      <span class="text-lg font-bold hover:text-blue-400">VPCI Clubs</span>
    </router-link>
    <div class="absolute left-1/2">
      <div style="margin-left: -50%">
        <img
          class="h-16 sm:h-28 border-2 border-gray-300 rounded-full shadow-lg"
          src="/img/vic-park-logo.png"
        />
      </div>
    </div>
    <router-link to="/clubs">
      <div class="text-lg font-bold hover:text-blue-400">Club Index</div>
    </router-link>
  </div>
  <div class="p-5 sm:p-12"></div>
</template>
