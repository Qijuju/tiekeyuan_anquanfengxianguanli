<template>
  <div class="nonBusinessLine">
    <van-nav-bar title="安全风险管理" right-text="关闭" @click-right="onClickRight" fixed></van-nav-bar>
    <div class="content">
      <van-row>
        <van-col span="8">
          <div class="imgB imgB1" @click="todowork()">
            {{ToDoWorkflowCount}}
          </div>
          <p @click="todowork()">待我审批</p>
        </van-col>
        <van-col span="8">
          <div class="imgB imgB2" @click="dowork()">
          </div>
          <p @click="dowork()">我已审批</p>
        </van-col>
        <van-col span="8">
          <div class="imgB imgB3" @click="icrate()">
          </div>
          <p @click="icrate()">我发起的</p>
        </van-col>
      </van-row>
    </div>
    <div class="charts">
      <div id="mycharts" calss="mycharts" :style="{width:mywidth,height:mywidth}"></div>
      <div class="fx-table">
        <van-row>
          <van-col span="9">
            <h3>项目名称</h3>
          </van-col>

          <van-col span="3">
            <h3>极高</h3>
          </van-col>
          <van-col span="3">
            <h3>高度</h3>
          </van-col>
          <van-col span="3">
            <h3>中度</h3>
          </van-col>
          <van-col span="3">
            <h3>低度</h3>
          </van-col>
          <van-col span="3">
            <h3>合计</h3>
          </van-col>
        </van-row>
        <van-row v-for="item in month_details">
       <!--   <div v-if="month_details.total>0">   -->
            <van-col span="9" class="getHeight">
              <h3>{{ item.xmmc}}</h3>
            </van-col>

            <van-col span="3">
              <h3>{{ item.jgfxd}}</h3>
            </van-col>
            <van-col span="3">
              <h3>{{ item.gdfxd}}</h3>
            </van-col>
            <van-col span="3">
              <h3>{{ item.zdfxd}}</h3>
            </van-col>
            <van-col span="3">
              <h3>{{ item.ddfxd}}</h3>
            </van-col>
            <van-col span="3">
              <h3>{{ item.count}}</h3>
            </van-col>
      <!--    </div>   -->
        </van-row>
      </div>
    </div>

  </div>
</template>

<script>
  import axios from 'axios';
  import Header from '../Common/Header'
  import echarts from 'echarts'
  import {Row, Col} from 'vant';

  export default {
    name: 'nonBusinessLine',// 和组件名称保持一致，只不过是小写的
    data() {
      return {
        ToDoWorkflowCount: '',//存放获取待办流程条数
        workflowTypeId: this._GLOBAL.workflowTypeId,
        charts: '',
        // mywidth: window.innerWidth + 'px',
        mywidth:document.body.clientWidth + 'px',
        month: '2018-02',
        type: 2,
        month_details: [],
        month_statistics: [],
      }
    },
    components: {
      Header
    },
    mounted: function () {
      this.GetToDoWorkflowCount()
      this.getPieData()
      this.getTableData()
    },
    methods: {
      // 表头关闭按钮事件
      onClickRight() {
        RPM.closeApplication()
      },
      getPieData() {

        var url = this._GLOBAL.API_ROOT+ '/AqfxglAllFxdjServlet?baseuserid=' + this._GLOBAL.baseUserId
        axios.get(url)
          .then(response => {
            var data = response.data
            this.month_statistics.push({value: data.jgfxd, name: '极高风险'})
            this.month_statistics.push({value: data.gdfxd, name: '高度风险'})
            this.month_statistics.push({value: data.zdfxd, name: '中度风险'})
            this.month_statistics.push({value: data.ddfxd, name: '低度风险'})
            this.drawPie('mycharts', '风险点个数统计', '', 0)
          }).catch(err => {
          console.error(err.message)
        })
      },
      getTableData() {

        var url = this._GLOBAL.API_ROOT+ '/AqfxglAllProjectServlet?baseuserid=' + this._GLOBAL.baseUserId
        axios.get(url)
          .then(response => {
            var data = response.data
            for (var i = 0; i < data.length; i++) {
              this.month_details.push(data[i])
            }
            this.$nextTick(function(){
              var obj = $(".getHeight");
              for(var i=0;i<obj.length;i++){
                var h=$(obj[i]).height(); // 63
                $(obj[i]).siblings().height(h);
                $(obj[i]).siblings().find("h3").css({
                  'lineHeight':h+'px'
                });
              }
            })
          }).catch(err => {
          console.error(err.message)
        })
      },
      resizeCharts() {
        let chartBox = document.getElementsByClassName('charts')[0]
        this.mywidth = chartBox.clientWidth + 'px'
      },

      drawPie(id, text, subtext, data) {
        this.charts = echarts.init(document.getElementById(id))
        var options = this.setoptions(text, subtext, this.month_statistics)
        this.charts.setOption(options)
      },
      setoptions(text, subtext, data) {
        var options = {
          title: {
            text: text,
            subtext: subtext,
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          color: ['red','green','#5cc8b0',"#467CE9"],
          /*legend: {
            //orient: 'vertical',
            //left: 'left',
            data: this.opinion
          },*/
          series: [
            {
              name: '安全风险统计图',
              type: 'pie',
              radius: '55%',
              center: ['50%', '50%'],
              data: data,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
        return options
      },
      todowork() {
        //跳转到待我审批页面展示
        this.$router.push({path: '/ToDoWork'});
      },
      dowork() {
        //跳转到我已审批页面展示
        this.$router.push({path: '/DoWork'});
      },
      icrate() {
        //跳转到我已审批页面展示
        this.$router.push({path: '/ICreate'});
      },
      //获取待我审批列表中的总条数
      GetToDoWorkflowCount() {
        var url = this._GLOBAL.API_ROOT+ '/GetToDoWorkflowCount?baseuserId=' + this._GLOBAL.baseUserId + '&workflowTypeId=' + this.workflowTypeId;
        axios.get(url)
          .then(response => {
            this.ToDoWorkflowCount = response.data;
          }).catch(err => {
          console.error(err.message)
        })
      },
    }
  }
</script>

<style scoped>
  .content{
    padding-top:10px;
    margin-top: 44px;
  }
  /* 设置头部 style start */
  .van-nav-bar{
    background: #2196F3;
    color: #fff;
  }
  .van-nav-bar .van-icon{
    color: #fff;
  }
  img{
    width:50px;
    height:50px;
  }
  .van-col.van-col-8{
    position: relative;
    height:90px;
  }
  .imgB{
    position: absolute;
    left:50%;
    margin-left:-20%;
    width:40%;
    height:50px;
    text-align: center;
    line-height:50px;
    color: #fff;
  }

  .imgB1{
    background: url("../../assets/images/sgrjhImages/dsp.png") no-repeat center;
    -webkit-background-size: contain;
    background-size: contain;
  }
  .imgB2{
    background: url("../../assets/images/sgrjhImages/ysp.png") no-repeat center;
    -webkit-background-size: contain;
    background-size: contain;
  }
  .imgB3{
    background: url("../../assets/images/sgrjhImages/fqd.png") no-repeat center;
    -webkit-background-size: contain;
    background-size: contain;
  }
  p{
    position: absolute;
    top:50px;
    left:0%;

    width:100%;
    height:48px;

    text-align: center;
    line-height:48px;
  }
  .charts{
    margin-bottom: 55px;
  }
  .chartsSize{
    font-size: 14px;
  }
  /*.charts .van-col{*/
  /*border: 1px solid #ccc;*/

  /*}*/
  .charts .van-row{
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    margin-top:-1px;

  }
  .charts .van-row:last-child{
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;
  }
  .charts .van-col{
    border-right:1px solid #ccc;
  }
  .charts .van-col:last-child{
    border-right:0;
  }

  /*修改样式*/
  .fx-table .van-row:first-child h3 {
    color: #909399;
    font-weight: 700;
    font-size: 14px;
  }
  .fx-table .van-row h3{
    font-size: 14px;
  }
  .charts .van-row:first-child{
    background-color: #D9EDF7;
  }
</style>
