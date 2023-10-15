<template>
  <div
    class="fixed bg-black bg-opacity-50 grid place-items-center z-50 backdrop-blur w-screen h-screen top-0 left-0"
  >
    <div class="bg-black rounded-lg overflow-hidden w-40">
      <button
        @click="signOut"
        class="flex items-center gap-2 py-2 px-3 cursor-pointer hover:bg-opacity-90"
      >
        <icon
          name="line-md:loading-alt-loop"
          size="22"
          color="#FFF"
          v-if="isLoading"
        />
        <icon
          name="material-symbols:logout-rounded"
          size="22"
          color="#FFF"
          v-else
        />

        <span class="text-white text-sm">Logout</span>
      </button>
      <button
        @click="store.signoutOverlay = false"
        class="flex items-center gap-2 py-2 px-3 cursor-pointer hover:bg-opacity-90"
      >
        <icon name="iconamoon:close-light" size="22" color="#FFF" />
        <span class="text-white text-sm">Close</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "~/stores/user.js";
const store = useUserStore();
const client = useSupabaseClient();
const isLoading = ref(false);
const signOut = async () => {
  isLoading.value = true;
  const { error } = await client.auth.signOut();
  isLoading.value = false;
  store.signoutOverlay = false;
  navigateTo("/auth");
};
</script>
