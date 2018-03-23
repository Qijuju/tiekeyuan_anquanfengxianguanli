<template>
  <div class="rd-index">
    <van-nav-bar title="安全风险分布" right-text="关闭" @click-right="onClickRight" fixed>
    </van-nav-bar>
    <div class="rd-index-search" @click="toSearch">
      <van-search></van-search>
    </div>
    <div class="rd-index-table-header">
      <van-row>
        <van-col span="4">
          <h3>年月</h3>
        </van-col>
        <van-col span="3">
          <h3>等级</h3>
        </van-col>
        <van-col span="5">
          <h3>风险工点</h3>
        </van-col>
        <van-col span="12">
          <h3>项目名称</h3>
        </van-col>
      </van-row>
    </div>
    <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite" :loadMoreText="nodataMsg">
      <div class="content" style="width: 100%">
        <table style="width: 100%" v-for="item in riskDistibutionList" class="tablelist" @click="toDetail(item)">
          <tr>
            <td style="width:16%">{{item.nf}}-{{item.yf}}</td>
            <td style="width:14%">{{item.dj}}</td>
            <td style="width:20%">{{item.fxgd}}</td>
            <td style="width:50%">{{item.xmmc}}</td>
          </tr>
        </table>
      </div>
    </v-scroll>

  </div>
</template>

<script>
  import {NavBar, Search, Toast, Waterfall} from 'vant'
  import {VTable, VPagination} from 'vue-easytable'
  import axios from 'axios';
  import Header from '../Common/Header'
  import Scroll from '../Common/PullRefresh';

  export default {
    name: "rd-index",
    components: {
      Header, 'v-scroll': Scroll
    },
    data() {
      return {
        baseuserid: this._GLOBAL.baseUserId,
        q_xmgljg: '',
        q_xmmc: '',
        q_fxgd: '',
        q_fxdj: '',
        q_nf: '',
        q_yf: '',
        q_type: '1',
        nodataMsg:'上滑加载更多',

        count: 0,
        pageNo: 1,
        allLoaded: false,
        isLoading: false,
        pageSize: 10,
        riskDistibutionList: [],
        num: 0,
        expands: []
      }
    },
    watch: {
      $route: function (to, from) {
        if (to.path == '/RiskDistribution/RDIndex') {
          var data = to.query;
          if (!this.isEmptyObject(data)) {
            this.q_xmgljg = data.q_xmgljg
            this.q_xmmc = data.q_xmmc
            this.q_fxgd = data.q_fxgd
            this.q_fxdj = data.q_fxdj
            this.q_nf = data.q_nf
            this.q_yf = data.q_yf
            this.q_type = data.q_type

            this.allLoaded = false
            this.pageNo = 1
            this.riskDistibutionList = []
            this.getRDList();
          } else if (from.name != 'RDNDetail' && from.name != 'RDHDetail' && from.name != 'RDSearch') {
            this.resetContext();
            this.getRDList();
          }
        }
      },
    },
    mounted: function () {
      this.getRDList();
    },
    methods: {
      isEmptyObject(e) {
        var t;
        for (t in e)
          return !1;
        return !0
      },
      toSearch() {
        this.$router.push({path: '/RiskDistribution/RDSearch'});
      },
      // 表头返回按钮事件
      //onClickLeft() {
      //  this.$router.go(-1)
      //},
      // 表头关闭按钮事件
      onClickRight() {
        RPM.closeApplication()
      },
      resetContext() {
        this.q_xmgljg = ''
        this.q_xmmc = ''
        this.q_fxgd = ''
        this.q_fxdj = ''
        this.q_nf = ''
        this.q_yf = ''
        this.q_type = '1'
        this.nodataMsg = '上滑加载更多'
        this.allLoaded = false
        this.pageNo = 1
        this.riskDistibutionList = []
      },
      toDetail(item) {
        var dj = item.fxdj
        if (dj == '0' || dj == '1') {
          this.$router.push({path: '/RiskDistribution/RDHDetail/' + item.id});
        } else {
          this.$router.push({path: '/RiskDistribution/RDNDetail/' + item.id});
        }
      },
      getRDList(done) {
        //this.page = 1;
        this.nodataMsg = '加载中...'
        var url = this._GLOBAL.API_ROOT + '/AqfxfbList?baseuserid=' + this.baseuserid + '&page=' + this.pageNo + '&pageCount=' + this.pageSize + '&xmgljg=' + this.q_xmgljg + '&xmmc=' + this.q_xmmc + '&fxgd=' + this.q_fxgd + '&fxdj=' + this.q_fxdj + '&year=' + this.q_nf + '&month=' + this.q_yf + '&type=' + this.q_type
        var vm = this;
        axios.get(url)
          .then(response => {
            var data = response.data.data
            for (var i in data) {
              vm.riskDistibutionList.push(data[i])
            }
            console.log("data lenght = "+data.length)
            console.log("数据data："+JSON.stringify(data));
            if (data.length = 0 || data.length < vm.pageSize) {
              vm.nodataMsg = "加载完毕"
            } else {
              vm.nodataMsg = "上滑加载更多"
              vm.pageNo++
            }
            if (done) {
              done()
            }
          }).catch(err => {
          console.error(err.message)
          if (done) {
            done()
          }
        })
      },

      onRefresh(done) {
        this.resetContext()
        this.getRDList(done);
      },

      onInfinite(done) {
        this.getRDList(done);
      },
    }

  }

</script>

<style scoped>

  /* 标题样式 */
  /* 设置头部 style start */
  .van-nav-bar {
    background: #2196F3;
    color: #fff;
  }

  .van-nav-bar .van-icon {
    color: #fff;
  }

  .rd-index-search {
    position: fixed;
    top: 46px;
    left: 0;
    width: 100%;
    z-index: 3;
    background: #E5F2FA;
  }

  .rd-index-table-header {
    position: fixed;
    top: 89px;
    width: 100%;
    border: 1px solid #efeff4;
    background-color: #fff;
    z-index: 2;
  }

  .tablelist {
    border: 1px solid #efeff4;
  }

  .tablelist td {
    padding: 6px 6px 3px 4px;
    font: Arial, Helvetica, sans-serif;
    text-align: center;
    border: 1px solid #efeff4;
  }

  .tablelist th {
    padding: 6px 6px 3px 4px;
    font: Arial, Helvetica, sans-serif;
    text-align: center;
  }

  /*.yo-scroll {*/
    /*top: 2.4rem;*/
  /*}*/

  /*修改样式*/
  .van-row .van-col h3{
    font-size: 12px;
  }
  .tablelist{
    margin-top: 0px;
  }
  .content{
    margin-top: 0px;
    color: #555;
  }
  .rd-index-table-header .van-row .van-col h3{
    color: #333;
  }

</style>
