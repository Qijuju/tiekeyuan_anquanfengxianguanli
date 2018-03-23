<template>
  <div class="rmn-Detail">
      <van-nav-bar title="安全风险卡控详情" left-text="返回" @click-left="onClickLeft" right-text="关闭" @click-right="onClickRight" fixed>
    </van-nav-bar>

    <div class="content">

      <van-row>
        <van-col class="first-col" span="8">项目名称</van-col>
        <van-col class="others-col" span="16">
          <span @click='popupClick(fxkkData.xmmc)'>{{fxkkData.xmmc}}</span>
        </van-col>
      </van-row>

      <van-row>
        <van-col class="first-col" span="8">风险工点</van-col>
        <van-col class="others-col" span="16">
          <span @click='popupClick(fxkkData.fxgd)'>{{fxkkData.fxgd}}</span>
        </van-col>
      </van-row>
      <van-row>
        <van-col class="first-col" span="8">风险等级</van-col>
        <van-col class="others-col" span="16">
          <span @click='popupClick(fxkkData.fxdj)'>{{fxkkData.fxdj}}</span>
        </van-col>
      </van-row>
      <van-row>
        <van-col class="first-col" span="8">专项施工方案是否编制</van-col>
        <van-col class="others-col" span="16">
          <span @click='popupClick(fxkkData.zxsgfabzsf)'>{{fxkkData.zxsgfabzsf=='1'?'是':'否'}}</span>
        </van-col>
      </van-row>
      <van-row>
        <van-col class="first-col" span="8">施工单位安全负责人</van-col>
        <van-col class="others-col" span="16">
          <span @click='popupClick(fxkkData.sgdwaqfzr)'>{{fxkkData.sgdwaqfzr}}</span>
        </van-col>
      </van-row>
      <van-row>
        <van-col class="first-col" span="8">监理单位总监审查意见</van-col>
        <van-col class="others-col" span="16">
          <span @click='popupClick(fxkkData.jldwzjscyj)'>{{fxkkData.jldwzjscyj}}</span>
        </van-col>
      </van-row>
      <van-row>
        <van-col class="first-col" span="8">项目管理机构审查意见</van-col>
        <van-col class="others-col" span="16">
          <span @click='popupClick(fxkkData.xmgljgscyj)'>{{fxkkData.xmgljgscyj}}</span>
        </van-col>
      </van-row>

      <van-row v-if="fxkkData.shtgdzxsgfa_array" v-for="(item,index) in fxkkData.shtgdzxsgfa_array" >
        <van-col class="first-col"  span="8"><span v-if="(index==0)">审查通过的专项施工方案</span></van-col>
        <van-col class="others-col" span="16">
          <template slot-scope="scope">
            <a :href="item.fj_url" download="item.fj_name" v-html="item.fj_name"></a>
          </template>
        </van-col>
      </van-row>

      <van-row>
        <van-col class="first-col" span="24">过程控制</van-col>
      </van-row>

      <!--<div v-for="item in gckzData" @click='showPCDetail(item.id)'>-->
        <!--<van-row>-->
          <!--<van-col class="first-col" span="8">{{item.fxdj}}</van-col>-->
          <!--<van-col class="others-col" span="8">{{item.jcdw}}</van-col>-->
          <!--<van-col class="others-col" span="8">{{item.jcrq}} <a>&nbsp;&nbsp;>></a></van-col>-->
        <!--</van-row>-->
      <!--</div>-->
      <div>
        <van-row>
          <van-col class="first-col" span="8">风险等级</van-col>
          <van-col class="first-col" span="8">检查单位</van-col>
          <van-col class="first-col" span="8">检查日期</van-col>
        </van-row>
        <div v-for="item in gckzData" v-show="gckzData.length" @click='showPCDetail(item.id)'>
          <van-row>
            <van-col class="others-col gckz-col" span="8">{{item.fxdj}}</van-col>
            <van-col class="others-col gckz-col" span="8">{{item.jcdw}}</van-col>
            <van-col class="others-col gckz-col" span="8">{{item.jcrq}} <a>&nbsp;&nbsp;>></a></van-col>
          </van-row>
        </div>
        <van-row v-show="!gckzData.length" class="nodata-row">
          暂无数据
        </van-row>
      </div>

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
    name: "rmn-detail",
    components: {},
    data() {
      return {
        id: this.$route.params.id,
        fxkkData: [],
        gckzData: [],
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
        // debugger
        let vm = this;
        let url = this._GLOBAL.API_ROOT + '/FxkkDetail?id=' + vm.id
        vm.$http.get(url).then((response) => {
          console.log("详情页面的数据：" + JSON.stringify(response.data));
          vm.fxkkData = response.data.fxkk;
          vm.gckzData = response.data.gckz;

          //vm.fxkkData.shtgdzxsgfa = "27|项目信息收集表.xlsx,27|项目信息收集表.xlsx,27|项目信息收集表.xlsx"

          vm.fxkkData.shtgdzxsgfa_array = [{}]
          if (vm.fxkkData.shtgdzxsgfa) {
            vm.fxkkData.shtgdzxsgfa_array = []
            vm.createFujianArray(vm.fxkkData.shtgdzxsgfa, vm.fxkkData.shtgdzxsgfa_array)
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
    border-right: 1px solid #ccc;
    margin-top: -1px;
  }

  .van-col {
    /*height: 44px;*/
    padding: 0;
    /*line-height: 44px;*/
    line-height: 23px;
    /* 折行显示 */
    white-space: normal;
    -ms-word-wrap: break-word;
    word-wrap: break-word;
    -ms-word-break: break-all;
    word-break: break-all;
  }

  .first-col {
    background: #E5F2FA;
    border-right: 1px solid #ccc;
    text-align: center;
    padding: 10px 0;
  }

  .others-col {
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding: 10px 5px;
  }

  .gckz-col{
    text-align: center;
    border-right: 1px solid #ccc;
  }

  .nodata-row{
    line-height: 44px;
    text-align: center;
    color: #999;
  }

  /* popup */
  .mint-popup{
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    padding:5px;
  }
</style>
