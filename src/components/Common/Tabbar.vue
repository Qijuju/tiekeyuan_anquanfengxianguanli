<template>
  <!--<van-tabbar v-model="active">-->
    <!--<van-tabbar-item icon="pending-evaluate" to="/Index">首页</van-tabbar-item>-->
    <!--<van-tabbar-item icon="pending-evaluate" to="/RiskDistribution/RDIndex">风险分布</van-tabbar-item>-->
    <!--<van-tabbar-item icon="pending-evaluate" to="/RiskManagement/RMIndex">风险卡控</van-tabbar-item>-->
  <!--</van-tabbar>-->
  <div class="tabbar">
    <van-tabbar v-model="active" android:name=".activity.MainActivity" android:windowSoftInputMode="stateVisible|adjustPan">
      <van-tabbar-item icon="shop" to="/Index">
        <span>首页</span>
        <template slot="icon" slot-scope="props" >
          <img src="../../assets/images/sgrjhImages/homeg.png" alt="" v-if="props.active">
          <img src="../../assets/images/sgrjhImages/home.png" v-else="">
        </template>
      </van-tabbar-item>
      <van-tabbar-item icon="shop" to="/RiskDistribution/RDIndex">
        <span>风险分布</span>
        <template slot="icon" slot-scope="props">
          <img src="../../assets/images/sgrjhImages/fxfbg.png" alt="" v-if="props.active">
          <img src="../../assets/images/sgrjhImages/fxfb.png" v-else="">
        </template>
      </van-tabbar-item>
      <van-tabbar-item icon="shop" to="/RiskManagement/RMIndex">
        <span>风险卡控</span>
        <template slot="icon" slot-scope="props">
          <img src="../../assets/images/sgrjhImages/fxkkg.png" alt="" v-if="props.active">
          <img src="../../assets/images/sgrjhImages/fxkk.png" v-else="">
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  import { Tabbar, TabbarItem } from 'vant';
    export default {
      name: "Tabbar",
      data() {
        return {
          active: 0,
          icon: {
            normal: '//img.yzcdn.cn/1.png',
            active: '//img.yzcdn.cn/2.png'
          }
        }
      }
    }
</script>

<style scoped>
  .van-tabbar{
    z-index: 8;
  }

</style>
