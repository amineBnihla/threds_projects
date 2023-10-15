<template>
  <div class="w-full mt-3">
    <div class="flex justify-between">
      <div class="flex gap-4 items-center">
        <img
          v-if="post && post.image"
          :src="post.image"
          class="rounded-full w-8"
          :alt="post.name"
          srcset=""
        />
        <span class="font-medium text-white">{{ post.name }}</span>
      </div>
      <div>
        <button
          class="relative sm:opacity-0 hover:opacity-100 transition-opacity duration-300"
        >
          <Icon name="ph:dots-three-bold" color="#fff" size="30"></Icon>
          <div class="absolute top-full right-0 bg-gray-950 rounded-sm">
            <button
              class="py-2 px-3 flex text-xs font-medium hover:bg-gray-900 text-red-600"
            >
              <Icon
                name="material-symbols:delete-outline"
                color="red"
                size="18"
                class="mr-2"
              ></Icon
              >Delete
            </button>
          </div>
        </button>
      </div>
    </div>
    <div class="flex h-full">
      <div
        class="min-w-[32px] min-h-full relative before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-[1px] before:bg-slate-500 before:h-full"
      ></div>
      <div class="pt-3">
        <p class="text-slate-300 text-xs mb-4" v-if="post && post.text">
          {{ post.text }}
        </p>
        <img
          v-if="post && post.picture"
          :src="post.picture"
          class="max-w-full"
          :alt="post.text"
          srcset=""
        />
      </div>
    </div>
    <div class="pt-3 flex gap-6">
      <div>
        <img
          :src="post.image"
          class="w-4 rounded-full translate-x-3"
          alt=""
          srcset=""
        />
        <img
          :src="post.image"
          class="w-3 -translate-y-1 rounded-full"
          alt=""
          srcset=""
        />

        <img
          :src="post.image"
          class="w-2 rounded-full translate-x-3 -translate-y-1"
          alt=""
          srcset=""
        />
      </div>
      <div class="flex flex-col">
        <button>
          <icon
            name="material-symbols:favorite-outline"
            color="#ffff"
            size="18"
          ></icon>
        </button>

        <div class="text-xs text-slate-400">2 Likes</div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(["post"]);
</script>
