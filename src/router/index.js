import { createRouter, createWebHistory } from 'vue-router'
import PasswordCheckerView from '../views/PasswordCheckerView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'passwordChecker',
      component: PasswordCheckerView
    },
  ]
})

export default router
