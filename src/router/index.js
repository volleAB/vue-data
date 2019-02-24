import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/main'
import Other from '@/components/other'
import store from '@/store'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/other',
      name: 'Test',
      component: Other,
      // beforeRouteLeave: (to, from, next) => {
      //   console.log(store.state.count)
      //   if(store.state.count > 2) {
      //     next()
      //     console.log('123')
      //   } else {
      //     alert('error')
      //     next(false)
      //   }
      // }
    }
  ]
})

// 全局守卫
router.beforeEach(function(to, from, next){
  if(store.state.home){ //false表示没登陆，true表示登陆
     if(to.path =="/"){
        next()
       } else {
        if(to.meta.r){//表示是否需要权限验证
          next()
        } else {
          if(to.path =="/other"){
             next()
          } else {
            alert("没有权限,请用管理员登陆")
            next({path:'/other'})}
        }
       }
  } else{
    alert('没有权限,请用管理员登陆' + to.path)
    to.path!="/other"? next({path:'/other'}):next()
    // next({path:'/other'})
  }
  console.log(store.state.home)
})
router.beforeResolve((to, from, next) => {
  next()
});
router.afterEach((to, from) => {
  console.log('afterEach 全局后置钩子')
})

export default router
