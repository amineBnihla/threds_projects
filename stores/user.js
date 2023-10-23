import {defineStore} from 'pinia'

export const useUserStore = defineStore('user',{
state: ()=>({
    posts:[],
    createPostOverlay:false,
    signoutOverlay:false
}),

actions:{
  async  getAllPosts(){
         try {
   let res  = await useFetch("/api/get_all_posts");
   this.posts = res.data
  } catch (error) {
    console.log(error);
  }
    }
}
})