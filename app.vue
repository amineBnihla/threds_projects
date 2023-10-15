<template>
  <div class="bg-black w-full flex justify-center h-screen overflow-hidden">
    <NuxtPage />
    <template v-if="store.createPostOverlay">
      <CreatePost></CreatePost>
    </template>
    <template v-if="store.signoutOverlay">
      <Modal></Modal>
    </template>
  </div>
</template>
<script setup>
import { useUserStore } from "~/stores/user.js";

const store = useUserStore();
</script>