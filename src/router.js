import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase/app'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Home from './views/Home.vue'
import Profile from './views/Profile'
import Users from './views/Users'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      meta: {layout: 'empty'},
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      meta: {layout: 'empty'},
      component: Register
    },
    {
      path: '/',
      name: 'home',
      meta: {layout: 'main', auth: true},
      component: Home
    },
    {
      path: '/profile',
      name: 'profile',
      meta: {layout: 'main', auth: true},
      component: Profile
    },
    {
      path: '/users',
      name: 'users',
      meta: {layout: 'main', auth: true},
      component: Users
    }
  ]
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requireAuth = to.matched.some(record => record.meta.auth)

  if (requireAuth && !currentUser) {
    next('/login?message=login')
  } else {
    next()
  }
})


export default router
