import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from '../components/Index/Index'   // 首页

import RDIndex from '../components/RiskDistribution/RDIndex'
import RDNDetail from '../components/RiskDistribution/RDNDetail'
import RDHDetail from '../components/RiskDistribution/RDHDetail'
import RDSearch from '../components/RiskDistribution/RDSearch'

import RMIndex from '../components/RiskManagement/RMIndex'
import RMNDetail from '../components/RiskManagement/RMNDetail'
import RMHDetail from '../components/RiskManagement/RMHDetail'
import RMPCDetail from '../components/RiskManagement/RMPCDetail'
import RMSearch from '../components/RiskManagement/RMSearch'

// 待办流程
import ToDoWork from '../components/todowork/ToDoWork'
import ToDoWorkSearch from '../components/todowork/ToDoWorkSearch'
import ToDoWorkScreen from '../components/todowork/ToDoWorkScreen'
// 已办流程
import DoWork from '../components/dowork/DoWork'
import DoWorkSearch from '../components/dowork/DoWorkSearch'
import DoWorkScreen from '../components/dowork/DoWorkScreen'
// 我发起的流程
import ICreate from '../components/icreate/ICreate'
import ICreateSearch from '../components/icreate/ICreateSearch'
import ICreateScreen from '../components/icreate/ICreateScreen'

import Detail from '../components/Index/Detail'   // 首页
import AuthFailed from '../components/Index/AuthFailed'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
    path: '/Index',
    name: 'Index',
    component: Index,
    meta: { keepAlive: true }
  }, {
    path: '/RiskDistribution/RDIndex',
    name: 'RDIndex',
    component: RDIndex,
    meta: { keepAlive: true }
  }, {
    path: '/RiskDistribution/RDNDetail/:id',
    name: 'RDNDetail',
    component: RDNDetail,
    meta: { keepAlive: false }
  }, {
    path: '/RiskDistribution/RDHDetail/:id',
    name: 'RDHDetail',
    component: RDHDetail,
    meta: { keepAlive: false }
  }, {
    path: '/RiskDistribution/RDSearch',
    name: 'RDSearch',
    component: RDSearch,
    meta: { keepAlive: false }
  }, {
    path: '/RiskManagement/RMIndex',
    name: 'RMIndex',
    component: RMIndex,
    meta: { keepAlive: true }
  }, {
    path: '/RiskManagement/RMNDetail/:id',
    name: 'RMNDetail',
    component: RMNDetail,
    meta: { keepAlive: false }
  }, {
    path: '/RiskManagement/RMHDetail/:id',
    name: 'RMHDetail',
    component: RMHDetail,
    meta: { keepAlive: false }
  }, {
    path: '/RiskManagement/RMPCDetail/:id',
    name: 'RMPCDetail',
    component: RMPCDetail,
    meta: { keepAlive: false }
  }, {
    path: '/RiskManagement/RMSearch',
    name: 'RMSearch',
    component: RMSearch,
    meta: { keepAlive: false }
  }, {
    path: '/ToDoWork',
    name: 'ToDoWork',
    component: ToDoWork,
    meta: { keepAlive: true }
  },
    {
      path: '/ToDoWorkScreen',
      name: 'ToDoWorkScreen',
      component: ToDoWorkScreen,
      meta: { keepAlive: false }
    },
    {
      path: '/ToDoWorkSearch',
      name: 'ToDoWorkSearch',
      component: ToDoWorkSearch,
      meta: { keepAlive: false }
    },
    // 已办流程
    {
      path: '/DoWork',
      name: 'DoWork',
      component: DoWork,
      meta: { keepAlive: true }
    },
    {
      path: '/DoWorkScreen',
      name: 'DoWorkScreen',
      component: DoWorkScreen,
      meta: { keepAlive: false }
    },
    {
      path: '/DoWorkSearch',
      name: 'DoWorkSearch',
      component: DoWorkSearch,
      meta: { keepAlive: false }
    },
    // 我发起的流程
    {
      path: '/ICreate',
      name: 'ICreate',
      component: ICreate,
      meta: { keepAlive: true }
    },
    {
      path: '/ICreateScreen',
      name: 'ICreateScreen',
      component: ICreateScreen,
      meta: { keepAlive: false }
    },
    {
      path: '/ICreateSearch',
      name: 'ICreateSearch',
      component: ICreateSearch,
      meta: { keepAlive: false }
    }, {
      path: '/Detail',
      name: 'Detail',
      component: Detail,
      meta: { keepAlive: false }
    }, {
      path: '/AuthFailed',
      name: 'AuthFailed',
      component: AuthFailed
    }, {
      path: '*',
      redirect: '/Index'
    }]
})



router.beforeEach((to, from, next) => {
  //console.dir(this);
  var _config =  Vue.prototype._GLOBAL
  if ((_config.baseUserId == '' || _config.loginId == '') && to.name != 'AuthFailed') {
    if(authUser(to.query)){
      next()
    }else{
      next('AuthFailed')
    }
  } else {
    if(authUser(to.query)){
      //TODO
    }else{
      //TODO
    }
    next()
  }

  function authUser(params){
    if (params != null && params.userid != null && params.sessionid != null) {
      //todo auth
      var userid = params.userid
      var sessionid = params.sessionid
      Vue.prototype._GLOBAL.baseUserId = userid
      Vue.prototype._GLOBAL.loginId = sessionid
      return true
    }
    return false
  }
});
router.afterEach((to, from) => {
});

export default router
