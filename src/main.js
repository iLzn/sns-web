import Vue from 'vue'
import App from './App.vue'
//引入VueRouter
import VueRouter from 'vue-router'
//引入路由器
import router from './router'
import store from './store'
//引入ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//关闭生产提示
Vue.config.productionTip = false
//应用插件
Vue.use(VueRouter)
Vue.use(ElementUI);

new Vue({
  render: h => h(App),
  router: router,
  store,
}).$mount('#app')
