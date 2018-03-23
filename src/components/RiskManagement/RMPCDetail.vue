<template>
  <div class="rmpc-Detail">
    <van-nav-bar title="安全风险过程控制详情" left-text="返回" @click-left="onClickLeft" right-text="关闭" @click-right="onClickRight" fixed>
    </van-nav-bar>

    <div class="content">

      <van-row>
        <van-col span="8">风险工点</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.fxgd)'>{{totalData.fxgd}}</span>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="8">风险等级</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.fxdj)'>{{totalData.fxdj}}</span>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="8">项目名称</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.xmmc)'>{{totalData.xmmc}}</span>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="8">项目管理机构</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.zhb)'>{{totalData.zhb}}</span>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="8">检查情况</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.jcqkwz)'>{{totalData.jcqkwz}}</span>
        </van-col>
      </van-row>


      <van-row v-for="(item,index) in totalData.jcqktp_array" v-if="totalData.jcqktp_array">
        <van-col span="8"><span v-if="(index==0)">检查情况附件</span></van-col>
        <van-col span="16">
          <template slot-scope="scope">
            <a :href="item.fj_url" download="item.fj_name" v-html="item.fj_name"></a>
          </template>
        </van-col>
      </van-row>

      <van-row>
        <van-col span="8">检查人</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.jcr)'>{{totalData.jcr}}</span>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="8">检查单位</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.jcdw)'>{{totalData.jcdw}}</span>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="8">检查日期</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.jcrq)'>{{totalData.jcrq}}</span>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="8">问题整改情况</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.wtzgqkwz)'>{{totalData.wtzgqkwz}}</span>
        </van-col>
      </van-row>

      <van-row v-for="(item,index) in totalData.wtzgqktp_array" v-if="totalData.wtzgqktp_array">
        <van-col span="8"><span v-if="(index==0)">问题整改情况附件</span></van-col>
        <van-col span="16">
          <template slot-scope="scope">
            <a :href="item.fj_url" download="item.fj_name" v-html="item.fj_name"></a>
          </template>
        </van-col>
      </van-row>

      <van-row>
        <van-col span="8">整改完成</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.zgwc)'>{{totalData.zgwc=='1'?'是':'否'}}</span>
        </van-col>
      </van-row>

    </div>
    <mt-popup
      v-model="popupVisible"
      popup-transition="popup-fade">
      <p>{{popupTxt}}</p>
    </mt-popup>
  </div>
</template>

<script>
  export default {
    name: "rmpc-detail",
    components: {},
    data() {
      return {
        id: this.$route.params.id,
        totalData: [],
        popupVisible: false,
        popupTxt: '',
      }
    },
    methods: {
      // 表头返回按钮事件
      onClickLeft() {
        this.$router.go(-1)
      },
      // 表头关闭按钮事件
      onClickRight() {
        RPM.closeApplication()
      },
      popupClick(txt) {
        this.popupVisible = true;
        this.popupTxt = txt;
      },
      getData() {
        let vm = this;
        let url = this._GLOBAL.API_ROOT + '/GckzUniqueServlet?id=' + vm.id
        vm.$http.get(url).then((response) => {
          console.log("详情页面的数据：" + JSON.stringify(response.data));
          vm.totalData = response.data
          //vm.totalData.jcqktp = "27|项目信息收集表.xlsx,27|项目信息收集表.xlsx,27|项目信息收集表.xlsx"
          vm.totalData.wtzgqktp_array = [{}]
          if (vm.totalData.wtzgqktp) {
            vm.totalData.wtzgqktp_array = []
            vm.createFujianArray(vm.totalData.wtzgqktp, vm.totalData.wtzgqktp_array)
          }
          vm.totalData.jcqktp_array = [{}]
          if (vm.totalData.jcqktp) {
            vm.totalData.jcqktp_array = []
            vm.createFujianArray(vm.totalData.jcqktp, vm.totalData.jcqktp_array)
          }
        }, (response) => {
          console.log('error');
        });
      },
      createFujianArray(field, array) {
        if (field) {
          var arr = field.split(",")
          for (var i = 0; i < arr.length; i++) {
            if (arr[i]) {
              var item = arr[i].split("|")
              if (item && item.length == 2) {
                var obj = {
                  fj_name: item[1],
                  fj_url: 'http://tljjgxt.r93535.com/FujianXiazai?fileid=' + item[0] + '&filename=' + encodeURIComponent(item[1])
                };
                array.push(obj);
              }
            }
          }
        }
      }
    },
    mounted: function () {
      this.getData(),
        $('.van-col.van-col-8').each(function (i) {
          var txtL = $($('.van-col.van-col-8')[i]).text().length;
          if (txtL > 7) {
            $($('.van-col.van-col-8')[i]).addClass('wordBreak')
          } else {
            $($('.van-col.van-col-8')[i]).removeClass('wordBreak')
          }
        })
    }

  }
</script>

<style scoped>
  .content {
    padding-bottom: 50px;
    margin-top: 46px;
  }

  /* 标题样式 */
  /* 设置头部 style start */
  .van-nav-bar {
    background: #2196F3;
    color: #fff;
  }

  .van-nav-bar .van-icon {
    color: #fff;
  }

  /* 修改栅格样式 */
  .van-row {
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    margin-top: -1px;
  }

  .van-col {
    height: 44px;
    padding: 0;
    line-height: 44px;
    /* 折行显示 */
    white-space: normal;
    -ms-word-wrap: break-word;
    word-wrap: break-word;
    -ms-word-break: break-all;
    word-break: break-all;
  }

  .van-col:nth-child(odd) {
    background: #E5F2FA;
    border-right: 1px solid #ccc;
    text-align: center;
  }

  .van-col:nth-child(even) {
    border-right: 1px solid #ccc;
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding: 0 5px;
  }

  /* popup */
  .mint-popup{
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    padding:5px;
  }
</style>
