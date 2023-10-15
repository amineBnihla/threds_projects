<template>
  <div id="MainLayout" class="h-screen relative w-[450px] max-w-full">
    <header class="grid absolute w-full top-0 place-items-center h-11">
      <img
        src="/threads-logo.png"
        width="32"
        height="32"
        alt="treads-logo"
        srcset=""
      />
    </header>
    <div class="h-[calc(100vh-88px)] absolute top-10 px-5 w-full">
      <slot></slot>
    </div>
    <footer
      class="absolute px-5 flex items-center justify-center gap-28 border-t border-gray-500 text-white h-11 bottom-0 w-full"
    >
      <button class="">
        <Icon name="material-symbols:home-outline" color="#FFFF" size="32" />
      </button>
      <button class="" @click="store.createPostOverlay = true">
        <Icon
          name="material-symbols:edit-square-outline"
          color="#FFFF"
          size="32"
        />
      </button>
      <button class="" @click="store.signoutOverlay = true">
        <Icon name="material-symbols:logout" color="#FFFF" size="32" />
      </button>
    </footer>
  </div>
</template>

<script setup>
import { useUserStore } from "~/stores/user.js";

const store = useUserStore();
</script>

