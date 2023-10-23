<template>
  <div
    class="fixed sm:w-[450px] max-w-screen h-screen top-0 left-0 sm:left-1/2 sm:-translate-x-1/2 z-50 bg-black"
  >
    <div
      class="border-b border-slate-300 h-[40px] flex items-center gap-3 pl-2 w-full"
    >
      <button @click="store.createPostOverlay = false">
        <Icon
          name="material-symbols:close-rounded"
          size="22"
          color="#FFFF"
        ></Icon>
      </button>
      <span class="text-white">New Post</span>
    </div>
    <div>
      <div
        class="w-full mt-3 relative h-[calc(100vh-92px)] max-h-screen overflow-y-auto px-2"
      >
        <div class="flex">
          <div class="flex gap-4 items-center">
            <img
              :src="user.identities[0].identity_data.avatar_url"
              class="rounded-full w-8"
              alt=""
              srcset=""
            />
            <span class="font-medium text-white">{{
              user.identities[0].identity_data.full_name
            }}</span>
          </div>
        </div>
        <div class="flex">
          <div
            class="min-w-[32px] min-h-full relative before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-[1px] before:bg-slate-500 before:h-full"
          ></div>
          <div class="pt-3 w-full">
            <textarea
              class="posttext text-slate-200 text-xs mb-4 border-none w-[350px] max-w-full outline-none bg-black placeholder:text-slate-200"
              placeholder="Text is here"
              v-model="text"
              @input="heightText"
            >
            </textarea>
            <img
              v-if="imageDisplay"
              :src="imageDisplay"
              class="max-w-full"
              alt=""
              srcset=""
            />
            <label for="image" class="block mt-2">
              <Icon name="iconoir:attachment" size="22" color="#FFFF" />
              <input
                type="file"
                @change="pickImage"
                class="hidden"
                name="image"
                id="image"
              />
            </label>
          </div>
        </div>
      </div>
      <button
        @click="createPost"
        class="absolute bottom-0 left-0 w-full h-10 flex justify-center items-center bg-black"
      >
        <span v-if="!isloading" class="text-blue-700 font-medium">Post</span>
        <span v-else class="text-white">
          <Icon
            name="eos-icons:bubble-loading"
            color="#FFFF"
            size="20"
            class="mr-1"
          />
          Loading
        </span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { v4 as uuidv4 } from "uuid";
import { useUserStore } from "~/stores/user.js";
const store = useUserStore();
const isloading = ref(false);
const client = useSupabaseClient();
const user = useSupabaseUser();
const imageChoseen = ref("");
const imageDisplay = ref("");
const text = ref("");
const heightText = () => {
  let textEr = document.querySelector(".posttext");
  textEr.style.height = "auto";
  textEr.style.height = textEr.scrollHeight + "px";
};
function pickImage(e) {
  imageChoseen.value = e.target.files[0];
  imageDisplay.value = URL.createObjectURL(e.target.files[0]);
}

function clearData() {
  text.value = "";
  imageChoseen.value = "";
  imageDisplay.value = "";
}

async function createPost() {
  let dataOut = "";
  isloading.value = true;
  if (imageChoseen.value) {
    const { data, error } = await client.storage
      .from("threads_files")
      .upload(`${uuidv4()}.jpg`, imageChoseen.value);
    if (error) {
      console.log(error);
      return;
    }
    dataOut = data.path ? data.path : "";
  }
  //console.log(user.value.identities[0].identity_data.name);
  //return;
  const post = await useFetch("/api/create_post", {
    method: "POST",
    body: {
      userId: user.value.identities[0].user_id.toString(),
      name: user.value.identities[0].identity_data.name,
      image: user.value.identities[0].identity_data.avatar_url,
      text: text.value,
      picture: dataOut,
    },
  });

  store.posts.push(post.data.value);
  store.createPostOverlay = false;
  isloading.value = false;
  clearData();
  console.log(post);
}

// onUnmounted(() => {
//   clearData();
// });
</script>
