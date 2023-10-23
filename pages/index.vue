<script setup>
import { useUserStore } from "../stores/user.js";
//let posts = ref([]);
const isLoading = ref(false);
let store = useUserStore();
const client = useSupabaseClient();
const user = useSupabaseUser();
const { posts } = toRefs(store);
const errors = ref([]);
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
  isLoading.value = true;
  let { error, data } = await useFetch("/api/get_all_posts");
  posts.value = data;
  console.log(error);
  isLoading.value = false;
});

async function deletePost(id, picture) {
  try {
    //const
    console.log(id);
    if (picture) {
      const { data, error } = client.storage
        .from("threads_files")
        .remove([picture]);
      if (error) {
        return;
      }
    }

    const postDeleted = await useFetch(`/api/delete_post/${id}`, {
      method: "DELETE",
    });
    posts.value = posts.value.filter((p) => p.id != id);
  } catch (error) {
    console.log(error);
  }
}
</script>


<template>
  <NuxtLayout :name="'main-layout'">
    <template v-if="posts?.length > 0">
      <Post
        v-for="post in posts"
        :key="post"
        @delete-post="deletePost(post.id, post.picture)"
        :post="post"
      ></Post>
    </template>
    <template v-else>
      <div v-if="isLoading" class="flex items-center justify-center py-8">
        <icon name="eos-icons:bubble-loading" color="#FFFF" size="44" />
      </div>
      <div v-else class="flex items-center justify-center py-8">
        <icon
          name="material-symbols:sentiment-dissatisfied-outline"
          color="#FFFF"
          size="33"
        />
      </div>
    </template>
  </NuxtLayout>
</template>

