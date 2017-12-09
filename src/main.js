// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyLoad from 'vue-lazyload'
// import './assets/common.less'

Vue.config.productionTip = false

/* eslint-disable no-new */
console.log(router)


Vue.use(VueLazyLoad,{
   preload:1.3,//预加载的宽高
   loading:"http://p0.ifengimg.com/a/2017/ifeng0815/loading-logo2.png",
   //error:"img加载失败时现实的图片的路径",
   attempt:1,//尝试加载的次数
   listenEvents:['scroll'], //你想让vue监听的事件
})

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

