<script src="router/index.js"></script>

<template>
  <div id="app">
    <div class="main">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive">
        </router-view>
      </keep-alive>

      <router-view v-if="!$route.meta.keepAlive">
      </router-view>
    </div>
    <Tabbar/>
  </div>
</template>

<script>
  import Tabbar from './components/Common/Tabbar'

  export default {
    components: {
       Tabbar
    },
    data(){
      return{

      }
    }
  }
</script>

