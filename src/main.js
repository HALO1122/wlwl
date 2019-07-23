// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueSocketio from 'vue-socket.io'
Vue.use(VueSocketio, 'ws://localhost:8081')

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App},
  template: '<App/>'
})

document.addEventListener('plusready', function() {
  var webview = plus.webview.currentWebview();
  plus.key.addEventListener('backbutton', function() {
      webview.canBack(function(e) {
          if(e.canBack) {
              webview.back();
          } else {
              webview.close(); //hide,quit按手机返回键直接退出APP
          }
      })
  });
});