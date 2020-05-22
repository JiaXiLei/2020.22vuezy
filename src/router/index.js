import Vue from 'vue'
import VueRouter from 'vue-router'


import Login from '@/pages/login'
import Home from '@/pages/home'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home,
	},
	{
		path: '/login',
		name: 'login',
		component: Login
	},
]



const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

router.beforeEach((to, from, next) => {
	
	const { fullPath } = to
	// console.log(localStorage.getItem('tiken'))
	if (!localStorage.getItem('token') && fullPath !== '/login') {
		next('/login')
	} else {
		next()
	}
})

export default router
