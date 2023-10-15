// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules:[
 'nuxt-icon',
   '@nuxtjs/supabase',
      '@pinia/nuxt',
      "@vite-pwa/nuxt",
  ],
 
  devtools: { enabled: false },
   supabase: {
   redirect:false
  },
   css: ['~/assets/css/main.css'],
    postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
