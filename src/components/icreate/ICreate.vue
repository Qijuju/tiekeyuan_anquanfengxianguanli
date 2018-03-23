<template>
  <div class="1">
    <!-- 安全风险管理我发起的列表-表头-开始 -->
    <div class="biaotou">
      <van-nav-bar title="我发起的" left-text="返回" @click-left="onClickLeft" right-text="关闭" @click-right="onClickRight">
      </van-nav-bar>
      <!-- 安全风险管理我已审批列表-表头-结束 -->
      <!-- 安全风险管理我发起的列表-搜索筛选框-开始 -->
      <van-row>
        <van-col span="12">
          <van-button bottom-action @click="ToICreateSearch()" class="todoWorkSearch">
            <!--<van-icon name="search" />-->
            <img class="seachimg" v-if="searchTab1" src="../../assets/images/sgrjhImages/searchg.png" alt="searchLogo">
            <img class="seachimg" v-else="false" src="../../assets/images/sgrjhImages/search.png" alt="searchLogo">
            搜索
          </van-button>
        </van-col>
        <van-col span="12">
          <van-button bottom-action @click="ToICreateScreen()" class="todoWorkScreen">
            <!--<van-icon name="search" />-->
            <img class="seachimg" v-if="searchTab2" src="../../assets/images/sgrjhImages/sxg.png" alt="searchLogo">
            <img class="seachimg" v-else="false" src="../../assets/images/sgrjhImages/sx.png" alt="searchLogo">
            筛选
          </van-button>
        </van-col>
      </van-row>
    </div>
    <!-- 安全风险管理我发起的列表-搜索筛选框-结束 -->

    <!-- 安全风险管理我发起的列表-list展示数据-开始 --><!-- 代办流程名称 -->
    <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite" :loadMoreText="nodataMsg">
      <table v-for="(plan, index) in ICreateflowList" class="tablelist" @click="toDetail(plan.url)">
        <tr>
          <td style="width:20%">流程标题:</td>
          <td style="width:80%">{{plan.requestName }}</td>
        </tr>
        <tr>
          <td style="width:20%">流程类型:</td>
          <td style="width:80%">{{plan.workflowName }}</td>
        </tr>
        <tr>
          <td style="width:20%">流程状态:</td>
          <td style="width:80%">{{plan.currentNodeName }}</td>
        </tr>
      </table>
    </v-scroll>
    <iframe style="margin-top:46px;width:100%;height:1000px;display:none"
            :src="[this._GLOBAL.API_ROOT+ ':89/verifyLogin.do?loginid='+this._GLOBAL.loginId]"></iframe>
    <!-- 安全风险管理我发起的列表-list展示数据-结束 -->
  </div>
</template>

<script>
  import {Waterfall} from 'vant';
  import Vue from 'vue';
  import axios from 'axios';
  import bus from '../bus';
  import Scroll from '../Common/PullRefresh';  //引入上拉加载，下拉刷新的插件

  // 安全风险管理我发起的列表-迭代动态数据-开始
  export default {
    name: "ICreate",
    components: {
      'v-scroll': Scroll
    },
    data() {
      return {
        counter: 1, //默认已经显示出15条数据 count等于一是让从16条开始加载
        num: 10,  // 一次显示多少条
        pageStart: 0, // 开始页数
        pageEnd: 0, // 结束页数
        nodataMsg:'上滑加载更多',

        count: 0,//存放展示条数
        //ICreateflowCount:[],//存放获取待办流程条数
        ICreateflowList: [],//存放获取待办流程列表
        requestName: '',//流程名称
        userId: this._GLOBAL.baseUserId,//基础平台用户id
        pageNo: '1',//页数
        workflowTypeId: this._GLOBAL.workflowTypeId,//流程分类id
        pageSize: '10',//每页条数
        workflowId: this._GLOBAL.workflowId,//流程类型id
        disabled: false,
        searchTab1: false,
        searchTab2: false,
      };
    },

//打开页面是调用此方法，获取代办流程列表数据
    mounted: function () {
      this.GetOnSearch();
      this.GetOnClickSgrjh();
      this.GetICreateflowList();
    },
    watch: {
      $route: function (to, from) {
        // debugger
        if (from.path == '/Index') {
          this.resetContext()
          this.GetICreateflowList()
        }
      },
    },
    methods: {
      toDetail(url) {
        var query = {
          url: url
        }
        this.$router.push({path: '/Detail', query: query});
      },
      resetContext() {
        this.ICreateflowList = []
        this.requestName = ''
        this.pageNo = 1
        this.workflowId = ''
        this.nodataMsg = '上滑加载更多'
      },
      // 表头返回按钮事件
      onClickLeft() {
        this.$router.go(-1)
      },
      // 表头关闭按钮事件
      onClickRight() {
        RPM.closeApplication()
      },

// 点击搜索按钮跳转到搜索页面
      ToICreateSearch() {
        this.searchTab1 = true;
        this.searchTab2 = false;
        $(".todoWorkSearch").css("color", "rgb(0, 135, 232)");
        $(".todoWorkScreen").css("color", "rgb(0,0,0)");
        this.$router.push({path: '/ICreateSearch'});
      },
      // 点击筛选按钮跳转到筛选页面
      ToICreateScreen() {
        this.searchTab1 = false;
        this.searchTab2 = true;
        $(".todoWorkSearch").css("color", "rgb(0, 0, 0)");
        $(".todoWorkScreen").css("color", "rgb(0, 135, 232)");
        this.$router.push({path: '/ICreateScreen'});
      },

      // 获取点击搜索按钮跳转事件的值
      GetOnSearch() {
        bus.$on('icreate-v-model', data => {
          this.resetContext()
          this.requestName = data
          this.GetICreateflowList()
        });
      },

      //
      GetOnClickSgrjh() {
        //获取我发起的页面展示-传递流程类型id 变量名van-button--normal
        bus.$on('icreate-van-button--normal', data => {
          this.resetContext()
          this.workflowId = data
          this.GetICreateflowList()
        });
      },


// 获取代办流程列表数据-拼接url，发送请求获取待办流程列表数据
      GetICreateflowList(done) {
        this.nodataMsg = '加载中...'
        var url = this._GLOBAL.API_ROOT + '/MyWorkflowRequestList?userId=' + this.userId + '&pageNo=' + this.pageNo + '&workflowTypeId=' + this.workflowTypeId + '&pageSize=' + this.pageSize + '&workflowId=' + this.workflowId + '&requestName=' + this.requestName
        var vm = this;
        axios.get(url)
          .then(response => {
            var data = response.data
            for (var i in data) {
              vm.ICreateflowList.push(data[i])
            }
            if (data.length = 0 || data.length < vm.pageSize) {
              vm.nodataMsg = "加载完毕"
            } else {
              vm.nodataMsg = "上滑加载更多"
              vm.pageNo++
            }
            if (done) {
              done();
            }
          }).catch(err => {
          console.error(err.message)
          if (done) {
            done();
          }
        })
      },

//下拉页面刷新数据操作
      onRefresh(done) {
        this.resetContext()
        this.GetICreateflowList(done)
      },

//上拉页面加载更多数据操作
      onInfinite(done) {
        this.GetICreateflowList(done)
      },


    }
  };

</script>

<style scoped>
  /* 表头标题演示 */
  .biaotou {
    position: fixed;
    width: 100%;
  }

  /* 设置头部 style start */
  .van-nav-bar {
    background: #2196F3;
    color: #fff;
  }

  .van-nav-bar .van-icon {
    color: #fff;
  }

  /* 设置头部 style end */

  /* 筛选标题样式 */
  .van-button--bottom-action {
    top: -3px;
  }

  /* 列表展示样式 */
  .yo-scroll {
    top: 1.8rem;
  }

  /* 施工日计划我发起的列表-搜索筛选框-字体样式 */
  /* .van-col-12 {
    font-size: 0px;
  } */
  /* 施工日计划我发起的列表-搜索筛选框-背景颜色 */
  .van-button--bottom-action {
    color: #000;
    /*background-color: #c9c9c9;*/
    background-color: rgb(229, 242, 250);
  }

  /*  施工日计划我发起的列表-代办列表信息-table样式 */
  /* html5 list页面的中间table标签样式  */
  .tablelist {
    /*width:100%;*/
    border-collapse: collapse;
    border: 1px solid #efeff4;
    margin-top: 3px;
    /*background-color: #efeff4;*/
    /*修改列表内容区域样式*/
    width: 95%;
    margin: 10px;
    border-radius: 4px;
    padding: 5px;
    -webkit-box-shadow: 0px 0px 5px 1px #ccc;
    box-shadow: 0px 0px 5px 1px #ccc;
  }

  .tablelist td {
    padding: 6px 6px 3px 4px;
    font: Arial, Helvetica, sans-serif;
    text-align: left;
  }

  .tablelist th {
    padding: 6px 6px 3px 4px;
    font: Arial, Helvetica, sans-serif;
    text-align: left;
  }

  /*修改施工日计划搜索和筛选的样式*/
  .van-col-12 button {
    border: 1px solid #ccc;
  }

  .van-button--bottom-action {
    height: 44px;
    line-height: 44px;
  }

  .seachimg {
    width: 20px;
    height: 20px;
  }
</style>
