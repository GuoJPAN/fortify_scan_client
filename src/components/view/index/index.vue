<template>
  <div class="index-content">
    <div>
      <el-row :gutter="10">
        <el-col :span="6" v-for="item in 4" :key="item">
          <el-card class="data-card" shadow="never">
            <el-row>
              <el-col :span="4" style="display: flex">
                <i
                  class="el-icon-s-tools"
                  style="align-self: center; margin-top: 10px"
                ></i>
              </el-col>
              <el-col :span="20">
                <div>外发成功率</div>
                <div>98%</div>
                <div>
                  <span style="color: red">10%</span>
                  <span>同比上周</span>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="10" style="margin-top: 10px">
        <el-col :span="16">
          <el-card shadow="never">
            <span style="font-size: 18px">外发成功率走势：</span>
            <div
              class="myChart"
              style="width: 100%; height: 300px"
              ref="chart"
            ></div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="never">
            <span style="font-size: 18px">月度外发结果分布：</span>
            <div style="height: 300px">
              <div>
                <div
                  class="myPie"
                  style="width: 100%; height: 300px"
                  ref="chartPie"
                ></div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="10" style="margin-top: 10px">
        <el-col :span="16">
          <el-card style="height: 200px" shadow="never">
            <span style="font-size: 18px">系统公告：</span>
            <el-table :data="unread" :show-header="false" style="width: 100%">
              <el-table-column>
                <template slot-scope="scope">
                  <span class="message-title">{{ scope.row.title }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="date" width="180"></el-table-column>
            </el-table>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card style="height: 200px" shadow="never">
            <span style="font-size: 18px">关于我们：</span>
            <div>创造价值，回馈社会</div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
let lineDataOption = {
  xAxis: {
    type: "category",
    data: ["1201", "1202", "1203", "1204", "1205", "1206", "1207"]
  },
  yAxis: {
    type: "value"
  },
  tooltip: {
    trigger: 'axis'
  },
  series: [
    {
      data: [98, 80, 67, 99, 100, 88, 95],
      type: "line",
      markPoint: {
        data: [
          { type: 'max', name: '最大值' },
          { type: 'min', name: '最小值' }
        ]
      },
      markLine: {
        data: [
          { type: 'average', name: '平均值' }
        ]
      }
    }
  ]
}

let pieDataOption = {
  title: {
    left: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  series: [
    {
      name: '占比',
      type: 'pie',
      data: [
        { value: 335, name: '外发成功' },
        { value: 50, name: '外发失败' }
      ],
      itemStyle: {
        normal: {
          color: function (params) {
            // 自定义颜色
            var colorList = [
              'rgb(127, 174, 144)', 'rgb(213, 58, 53)'
            ]
            return colorList[params.dataIndex]
          }
        }
      }
    }
  ]
}

export default {
  name: "index",
  data () {
    return {
      message: 'first',
      showHeader: false,
      unread: [{
        date: '2018-04-19 20:00:00',
        title: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护'
      }, {
        date: '2018-04-19 21:00:00',
        title: '今晚12点整发大红包，先到先得'
      }],
      read: [{
        date: '2018-04-19 20:00:00',
        title: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护'
      }],
      recycle: [{
        date: '2018-04-19 20:00:00',
        title: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护'
      }]
    }
  },
  methods: {
    getTest () {
      this.http
        .getTest()
        .then((data) => {
          console.log(data)
        })
        .catch(console.log(2))
    },
    drawLine () {
      // 这里是实例化一个echarts对象并且初始化上面创建好的dom
      // let myChart = this.$echarts.init(document.getElementById('myChart'))
      var charts = this.$refs.chart
      var chartPie = this.$refs.chartPie
      if (charts && chartPie) {
        let myChart = this.$echarts.init(charts)
        let myChartPie = this.$echarts.init(chartPie)
        myChart.setOption(lineDataOption)
        myChartPie.setOption(pieDataOption)
        // 浏览器窗口大小改变，重新绘制图表
        window.onresize = () => {
          myChart.resize()
          myChartPie.resize()
        }
      } else {
        console.log('charts不能为空')
      }
      // 制作图标的具体实现
      // myChart.setOption({
      //   title: {text: '在Vue中使用echarts'},
      //   tooltip: {},
      //   xAxis: {
      //     data: ['一月', '二月', '三月', '四月']
      //   },
      //   yAxis: {},
      //   series: [{
      //     name: '裤衩',
      //     type: 'bar',
      //     data: [5, 20, 36, 10, 10, 20]
      //     //略。。。
      //   }]
      // });
    }
  },
  mounted: function () {
    this.getTest()
    this.drawLine()
  }
}
</script>

<style scoped>
.index-content {
  margin: 5px;
  font-size: 8px;
}
.el-card >>> .el-card__body {
  padding: 5px;
}
.el-icon-s-tools {
  font-size: 25px;
  color: dodgerblue;
  margin: auto;
}
</style>
