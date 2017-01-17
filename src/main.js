// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VueHead from 'vue-head'
import App from './App'

import LandingView from './pages/LandingView.vue'

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(VueHead);

var router = new VueRouter({
    hashbang: false,
    history: true,
    root: '/',
    saveScrollPosition: true,
    transitionOnLoad: true,
    routes: [
        { path: '/', component: LandingView },
        { path: '*', redirect: '/' }
    ]
})

new Vue({
    el: '#app',
    router: router,
    template: '<router-view></router-view>'
})


window.router = router;

