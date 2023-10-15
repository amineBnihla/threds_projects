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
onBeforeMount(async () => {
  try {
  } catch (error) {}
  await useFetch("/api/get_all_posts");
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

