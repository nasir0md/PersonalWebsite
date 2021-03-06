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
import NotFoundView from './pages/404.vue'
import ConsoleLogin from './pages/ConsoleLogin.vue'
import Console from './pages/Console.vue'

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(VueHead);
Vue.use(VueMaterial);

Vue.prototype.convertLocToStr = function (loc) {
    return loc.replace(/_/g, ' ');
}

var router = new VueRouter({
    hashbang: false,
    root: '/',
    mode: 'history',
    saveScrollPosition: true,
    canReuse: false,
    transitionOnLoad: true,
    routes: [
        { path: '/', component: LandingView },
        { path: '/blog', component: BlogView },
        { path: '/blog/*', component: BlogView },
        { path: '/404', component: NotFoundView },
        { path: '/console/login', component: ConsoleLogin },
        { path: '/console', component: Console },
        { path: '*', redirect: '/' }
    ]
})

new Vue({
    el: '#app',
    router: router,
    template: '<router-view></router-view>'
})


window.router = router;

