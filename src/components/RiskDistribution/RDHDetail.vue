<template>
  <div class="rdh-Detail">
    <van-nav-bar title="安全风险分布详情" left-text="返回" @click-left="onClickLeft" right-text="关闭" @click-right="onClickRight" fixed>
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
        <van-col span="8">年份</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.nf)'>{{totalData.nf}}</span>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="8">月份</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.yf)'>{{totalData.yf}}</span>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="8">项目名称</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.xmmc)'>{{totalData.xmmc}}</span>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="8">工程进展情况</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.gcjzqk)'>{{totalData.gcjzqk}}</span>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="8">主要风险源</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.zyfxy)'>{{totalData.zyfxy}}</span>
        </van-col>
      </van-row>

      <van-row>
        <van-col span="24">六项措施落实情况</van-col>
      </van-row>

      <van-row>
        <van-col span="8">专项施工方案</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.zxsgfa_check)'>{{totalData.zxsgfa_check=='1'?'是':'否'}}</span>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="8">方案审查</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.fasc_check)'>{{totalData.fasc_check=='1'?'是':'否'}}</span>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="8">安全验算</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.aqys_check)'>{{totalData.aqys_check=='1'?'是':'否'}}</span>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="8">专家论证</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.zjlz_check)'>{{totalData.zjlz_check=='1'?'是':'否'}}</span>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="8">安全包保领导、工程师</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.aqbbldgcs_check)'>{{totalData.aqbbldgcs_check=='1'?'是':'否'}}</span>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="8">过程控制</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.gckz_check)'>{{totalData.gckz_check=='1'?'是':'否'}}</span>
        </van-col>
      </van-row>
      <!--<div class="rdh-line"></div>-->
      <van-row>
        <van-col span="8">动态安全控制措施</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.dtaqkzcs)'>{{totalData.dtaqkzcs}}</span>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="8">施工单位</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.xmb)'>{{totalData.xmb}}</span>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="8">施工单位包保人</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.sgdwbbr)'>{{totalData.sgdwbbr}}</span>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="8">监理单位</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.jlz)'>{{totalData.jlz}}</span>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="8">监理单位包保人</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.jldwbbr)'>{{totalData.jldwbbr}}</span>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="8">设计单位</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.sjdw)'>{{totalData.sjdw}}</span>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="8">设计单位包保人</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.sjdwbbr)'>{{totalData.sjdwbbr}}</span>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="8">项目管理机构</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.zhb)'>{{totalData.zhb}}</span>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="8">项目管理机构包保人</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.xmgljgbbr)'>{{totalData.xmgljgbbr}}</span>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="8">建设处包保人</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.jscbbr)'>{{totalData.jscbbr}}</span>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="8">备注</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.bz)'>{{totalData.bz}}</span>
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
    name: "rdh-detail",
    components: {},
    data() {
      return {
        id:this.$route.params.id,
        totalData:[],
        popupVisible:false,
        popupTxt:'',
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
      getData(){
        // debugger
        let vm = this;
        let url=this._GLOBAL.API_ROOT + '/AqfxglDetail?id='+vm.id
        vm.$http.get(url).then((response) => {
          console.log("详情页面的数据：" + JSON.stringify(response.data));
          vm.totalData = response.data;
        }, (response) => {
          console.log('error');
        });

      }
    },
    mounted:function () {
      this.getData(),
        $('.van-col.van-col-8').each(function (i) {
          var txtL=$($('.van-col.van-col-8')[i]).text().length;
          if(txtL>7){
            $($('.van-col.van-col-8')[i]).addClass('wordBreak')
          }else {
            $($('.van-col.van-col-8')[i]).removeClass('wordBreak')
          }
        })
    }

  }
</script>

<style scoped>
  .content{
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
  .van-row{
    border-top:1px solid #ccc;
    border-bottom:1px solid #ccc;
    margin-top:-1px;
  }
  .van-col{
    height:44px;
    padding:0;
    line-height:44px;
    /* 折行显示 */
    white-space: normal;
    -ms-word-wrap: break-word;
    word-wrap: break-word;
    -ms-word-break: break-all;
    word-break: break-all;
  }
  .van-col:nth-child(odd){
    background: #E5F2FA;
    border-right:1px solid #ccc;
    text-align: center;
  }
  .van-col:nth-child(even){
    border-right:1px solid #ccc;
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding: 0 5px;
  }
  .rdh-line{
    width:100%; border-top:3px solid #ddd
  }

  /* popup */
  .mint-popup{
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    padding:5px;
  }
</style>
