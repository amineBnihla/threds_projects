<template>
  <div class="h-screen w-[450px]">
    <div class="pt-20 flex flex-col items-center justify-center">
      <span class="text-red-600" v-if="isError">Something went wrong</span>
      <div class="flex py-3">
        <img
          src="/threads-logo.png"
          width="32"
          height="32"
          class="mr-1"
          alt="treads-logo"
          srcset=""
        />
        <span class="text-white text-xl font-medium">Threads</span>
      </div>

      <span class="text-base text-white mb-4 text-center block"
        >Login/Register</span
      >
      <button
        @click="signIn"
        class="flex items-center hover:bg-gray-950 justify-center border border-gray-400 rounded-full w-80 py-2"
      >
        <img src="/github-logo.png" width="25" class="mr-2" alt="" srcset="" />
        <span class="text-white font-medium">Github</span>
      </button>
    </div>
  </div>
</template>

<script setup>
const client = useSupabaseClient();
const user = useSupabaseUser();
watchEffect(() => {
  if (user.value) {
    return navigateTo("/");
  }
});

const isError = ref(false);
const signIn = async () => {
  const { data, error } = await client.auth.signInWithOAuth({
    provider: "github",
    redirectTo: window.location.origin,
  });
  //console.log(data, error);
  if (error) {
    isError.value = true;
    return;
  }
};
// definePageMeta({
//   middleware: "auth",
// });
</script>
