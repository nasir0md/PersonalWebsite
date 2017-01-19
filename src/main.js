// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VueHead from 'vue-head'
import VueMaterial from 'vue-material'
import App from './App'

import LandingView from './pages/LandingView.vue'
import BlogView from './pages/BlogView.vue'

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(VueHead);
Vue.use(VueMaterial);

var router = new VueRouter({
    hashbang: false,
    mode: 'history',
    root: '/',
    saveScrollPosition: true,
    transitionOnLoad: true,
    routes: [
        { path: '/', component: LandingView },
        { path: '/blog', component: BlogView },
        { path: '/blog/*', component: BlogView },
        { path: '*', redirect: '/' }
    ]
})

new Vue({
    el: '#app',
    router: router,
    template: '<router-view></router-view>'
})


window.router = router;

