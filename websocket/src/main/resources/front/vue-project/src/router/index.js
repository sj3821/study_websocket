import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/websoeckdemo',
    name: 'websoeckdemo',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/websoeckdemo.vue')
  },
  {
    path: '/chatView',
    name: 'chatView',
    component: () => import('../views/chatView.vue'),
    props: true
  }
]

const router = createRouter({
  mode : 'history' ,
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
