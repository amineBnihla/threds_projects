<script setup>
let posts = ref([]);
const user = useSupabaseUser();
// definePageMeta({
//   middleware: ["auth"],
//   // or middleware: 'auth'
// });
watchEffect(() => {
  if (!user.value) {
    return navigateTo("/auth");
  }
});
onMounted(() => {
  posts.value = [
    {
      name: "Amine Bnihla ",
      image: "https://placehold.co/500",
      text: "This is the title",
      picture: "https://placehold.co/300",
    },
  ];
});
</script>

<template>
  <NuxtLayout :name="'main-layout'">
    <template v-if="posts">
      <Post v-for="post in posts" :key="post" :post="post"></Post>
    </template>
  </NuxtLayout>
</template>

