<template>
  <div class="rd-search">
    <van-nav-bar title="安全风险分布" left-text="返回" @click-left="onClickLeft" right-text="搜索" @click-right="onClickRight">
    </van-nav-bar>

    <div @click="isShowXMGLJG()">
      <van-row>
        <van-field
          v-bind:value="xmgljg"
          label="项目管理机构"
          placeholder="全部"
          disabled
        />
      </van-row>
    </div>

    <div @click="isShowXMMC()">
      <van-row>
        <van-field
          v-bind:value="xmmc"
          label="项目名称"
          placeholder="全部"
          disabled
        />
      </van-row>
    </div>

    <div @click="isShowFXGD()">
      <van-row>
        <van-field
          v-bind:value="fxgd"
          label="风险工点"
          placeholder="全部"
          disabled
        />
      </van-row>
    </div>

    <div @click="isShowFXDJ()">
      <van-row>
        <van-field
          v-bind:value="fxdj"
          label="风险等级"
          placeholder="全部"
          disabled
        />
      </van-row>
    </div>

    <div @click="isShowNF()">
      <van-row>
        <van-field
          v-bind:value="nf"
          placeholder="全部"
          label="年份"
          disabled
        />
      </van-row>
    </div>

    <div @click="isShowYF()">
      <van-row>
        <van-field
          v-bind:value="yf"
          placeholder="全部"
          label="月份"
          disabled
        />
      </van-row>
    </div>


    <van-row v-show="showxmgljg">
      <van-col>
        <van-picker :columns="xmgljgcolumns"
                    v-bind:visible-item-count='visibleItemCount'
                    v-bind:value="xmgljg" show-toolbar @cancel="closeAll"
                    @confirm="onXMGLJGConfirm"
        />
      </van-col>
    </van-row>
    <van-row v-show="showxmmc">
      <van-col>
        <van-picker :columns="xmmccolumns"
                    v-bind:visible-item-count='visibleItemCount'
                    v-bind:value="xmmc" show-toolbar @cancel="closeAll"
                    @confirm="onXMMCConfirm"
        />
      </van-col>
    </van-row>

    <van-row v-show="showfxdj">
      <van-col>
        <van-picker :columns="fxdjcolumns"
                    v-bind:visible-item-count='visibleItemCount'
                    v-bind:value="fxdj" show-toolbar @cancel="closeAll"
                    @confirm="onFXDJConfirm"
        />
      </van-col>
    </van-row>

    <van-row v-show="showfxgd">
      <van-col>
        <van-picker :columns="fxgdcolumns"
                    v-bind:visible-item-count='visibleItemCount'
                    v-bind:value="fxgd" show-toolbar @cancel="closeAll"
                    @confirm="onFXGDConfirm"
        />
      </van-col>
    </van-row>


    <van-row v-show="shownf">
      <van-col>
        <van-picker :columns="nfcolumns"
                    v-bind:visible-item-count='visibleItemCount'
                    v-bind:value="nf" show-toolbar @cancel="closeAll"
                    @confirm="onNFConfirm"
        />
      </van-col>
    </van-row>

    <van-row v-show="showyf">
      <van-col>
        <van-picker :columns="yfcolumns"
                    v-bind:visible-item-count='visibleItemCount'
                    v-bind:value="yf" show-toolbar @cancel="closeAll"
                    @confirm="onYFConfirm"
        />
      </van-col>
    </van-row>

  </div>
</template>

<script>
  import {Toast} from 'vant';
  import Vue from 'vue';
  import axios from 'axios';

  export default {
    name: "rd-search",
    components: {
      Toast
    },
    data() {
      return {
        visibleItemCount:3,
        opt_xmgljg: [],
        opt_xmmc: [],
        opt_fxgd: [],
        opt_fxdj: [],

        xmgljg: '',
        xmgljg_id: '',
        showxmgljg: false,
        xmgljgcolumns: ['全部'],

        xmmc: '',
        xmmc_id: '',
        showxmmc: false,
        xmmccolumns: ['全部'],

        fxdj: '',
        fxdj_id: '',
        showfxdj: false,
        fxdjcolumns: ['全部', '低度', '中度', '高度', '极高'],//低度，中度，高度，极高

        fxgd: '',
        fxgd_id: '',
        showfxgd: false,
        fxgdcolumns: ['全部'],

        nf: '全部',
        shownf: false,
        nfcolumns: ['全部', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'],

        yf: '全部',
        showyf: false,
        yfcolumns: ['全部', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],


        yearmonth: new Date(new Date().getFullYear(), new Date().getMonth(), 1),

      }
    },
    mounted: function () {
      this.getXMGLJGDict();
      this.getXMMCDict();
      this.getFXGDDict();
      var curr_year = new Date().getFullYear();
      console.log(curr_year);
    },
    methods: {
      closeAll() {
        this.showxmmc = false
        this.showxmgljg = false
        this.showfxgd = false
        this.showfxdj = false
        this.shownf = false
        this.showyf = false
      },
      closeOthers(value) {
        if (value != 'xmmc') {
          this.showxmmc = false
        }
        if (value != 'xmgljg') {
          this.showxmgljg = false
        }
        if (value != 'fxgd') {
          this.showfxgd = false
        }
        if (value != 'fxdj') {
          this.showfxdj = false
        }
        if (value != 'nf') {
          this.shownf = false
        }
        if (value != 'yf') {
          this.showyf = false
        }
      },
      onClickLeft() {
        this.$router.go(-1)
      },
      onClickRight() {
        var query = {
          q_xmgljg:this.xmgljg_id,
          q_xmmc:this.xmmc_id,
          q_fxgd:this.fxgd_id,
          q_fxdj:this.fxdj_id,
          q_nf:(this.nf=='全部')?'':this.nf,
          q_yf:(this.yf=='全部')?'':this.yf,
          q_type:'1',
          q_page:'1'
        }
       this.$router.push({path: '/RiskDistribution/RDIndex', query: query});
      },

      getXMGLJGDict() {
        var url = this._GLOBAL.API_ROOT + '/XmgljgServlet?baseuserid=' + this._GLOBAL.baseUserId
        axios.get(url)
          .then(response => {
            this.opt_xmgljg = response.data
            var data = this.opt_xmgljg
            this.xmgljgcolumns = ['全部']
            for (var i in data) {
              this.xmgljgcolumns.push(data[i].subcompanyname)
            }
          }).catch(err => {
          console.error(err.message)
        })
      },

      getXMMCDict() {
        this.xmmccolumns = ['全部']
        this.xmmc = ''
        this.xmmc_id = ''
        var url = this._GLOBAL.API_ROOT + '/XiangmuServlet?orgid=' + this._GLOBAL.ORG_ID + '&baseuserid=' + this._GLOBAL.baseUserId + '&xmgljg=' + this.xmgljg_id
        axios.get(url)
          .then(response => {
            this.opt_xmmc = response.data
            var data = this.opt_xmmc
            console.log(response.data)
            for (var i in data) {
              this.xmmccolumns.push(data[i].xmmc)
            }
          }).catch(err => {
          console.error(err.message)
        })
      },

      getFXGDDict() {
        this.fxgdcolumns = ['全部']
        this.fxgd = ''
        this.fxgd_id = ''
        var url = this._GLOBAL.API_ROOT + '/AqfxglDict?baseuserid=' + this._GLOBAL.baseUserId + '&xmgljg=' + this.xmgljg_id + '&xmmc=' + this.xmmc + '&fxdj=' + this.fxdj_id
        axios.get(url)
          .then(response => {
            this.opt_fxgd = response.data
            var data = this.opt_fxgd
            for (var i in data) {
              this.fxgdcolumns.push(data[i].fxgd)
            }
          }).catch(err => {
          console.error(err.message)
        })
      },

      resetFXDJ() {
        this.fxdj = ''
        this.fxdj_id = ''
      },

      isShowXMGLJG() {
        this.closeOthers('xmgljg')
        this.showxmgljg = !this.showxmgljg
      },
      onXMGLJGConfirm(value, index) {
        var data = this.opt_xmgljg
        for (var i in data) {
          if (index != 0) {
            if (data[i].subcompanyname == value) {
              this.xmgljg = data[i].subcompanyname
              this.xmgljg_id = data[i].id
            }
          } else {
            this.xmgljg_id = ''
            this.xmgljg = '全部'
          }
        }
        this.closeAll()
        this.getXMMCDict();
        this.resetFXDJ();
        this.getFXGDDict();
      },

      isShowXMMC() {
        this.closeOthers('xmmc')
        this.showxmmc = !this.showxmmc
      },
      onXMMCConfirm(value, index) {
        var data = this.opt_xmmc
        for (var i in data) {
          if (index != 0) {
            if (data[i].xmmc == value) {
              this.xmmc = data[i].xmmc
              this.xmmc_id = data[i].id
            }
          } else {
            this.xmmc_id = ''
            this.xmmc = '全部'
          }
        }
        this.closeAll()
        this.resetFXDJ()
        this.getFXGDDict();
      },

      isShowFXDJ() {
        this.closeOthers('fxdj')
        this.showfxdj = !this.showfxdj
      },
      onFXDJConfirm(value, index) {
        if (index == 0) {
          this.fxdj_id = ''
          this.fxdj = '全部'
        } else {
          this.fxdj_id = 4-index
          this.fxdj = this.fxdjcolumns[index];
        }
        this.closeAll()
        this.getFXGDDict();
      },

      isShowFXGD() {
        this.closeOthers('fxgd')
        this.showfxgd = !this.showfxgd
      },
      onFXGDConfirm(value, index) {
        var data = this.opt_fxgd
        for (var i in data) {
          if (index != 0) {
            if (data[i].fxgd == value) {
              this.fxgd = data[i].fxgd
              this.fxgd_id = data[i].id
            }
          } else {
            this.fxgd_id = ''
            this.fxgd = '全部'
          }
        }
        this.closeAll()
      },

      isShowNF() {
        this.closeOthers('nf')
        this.shownf = !this.shownf
      },
      onNFConfirm(value, index) {
        if (index == 0) {
          this.nf = '全部'
        } else {
          this.nf = this.nfcolumns[index];
        }
        this.closeAll()
      },

      isShowYF() {
        this.closeOthers('yf')
        this.showyf = !this.showyf
      },
      onYFConfirm(value, index) {
        if (index == 0) {
          this.yf = '全部'
        } else {
          this.yf = this.yfcolumns[index];
        }
        this.closeAll()
      }
    }

  }
</script>

<style scoped>
  /* 设置头部 style start */
  .van-nav-bar{
    background: #2196F3;
    color: #fff;
  }
  .van-nav-bar .van-icon{
    color: #fff;
  }
  .van-col {
    height: 44px;
    text-align: center;
    line-height: 44px;
  }

  /*.van-picker {*/
    /*position: fixed;*/
    /*width: 100%;*/
  /*}*/

  .van-picker-column {
    font-size: 14px;
    text-align: left;
  }
</style>
