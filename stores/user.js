import {defineStore} from 'pinia'

export const useUserStore = defineStore('user',{
state: ()=>({
    posts:[],
    createPostOverlay:false,
    signoutOverlay:false
})
})