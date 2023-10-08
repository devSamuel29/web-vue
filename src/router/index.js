import { createRouter, createWebHistory } from 'vue-router'
import VideoPlayer from '../views/HomeView.vue'
import RegisterForm from '../views/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: VideoPlayer
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterForm
    }
  ]
})

export default router
