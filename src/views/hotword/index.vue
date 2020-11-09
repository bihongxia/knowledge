<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-container>
        <el-aside>
          <div class="grid-content bg-purple">
            <el-table
              ref="singleTable"
              v-loading="wordLoading"
              :data="wordList"
              highlight-current-row
              style="width: 100%"
              element-loading-background="rgba(255, 255, 255, 0.8)"
              element-loading-text="加载中"
              @current-change="handleCurrentChange"
            >
              <el-table-column
                property="word"
                label="热词"
                width="120"
              />
              <el-table-column
                property="counts"
                label="热度"
                width="120"
              />
            </el-table>
          </div>
        </el-aside>
        <el-main>
          <div class="quick-query">
            <el-radio-group v-model="queryParams" size="mini" @change="handleEcharts">
              <el-radio-button label="y">年</el-radio-button>
              <el-radio-button label="m">月</el-radio-button>
              <el-radio-button label="d">日</el-radio-button>
              <el-radio-button label="h">时</el-radio-button>
              <el-radio-button label="i">分</el-radio-button>
            </el-radio-group>
          </div>
          <div
            v-loading="chartLoading"
            element-loading-background="rgba(255, 255, 255, 0.8)"
            element-loading-text="加载中"
            class="grid-content bg-purple-light"
            :style="{width:'100%',height: '360px'}"
          >
            <div id="line_chart" :style="{width:'100%',height: '360px'}" />
          </div>
        </el-main>
      </el-container>
    </el-card>
    <el-card class="box-card">

      <div id="myChart" :style="{ height: '600px'}" />

    </el-card>
  </div>
</template>

<script>
import { list, stat } from '@/api/hotword'
import echarts from 'echarts'
require('echarts-wordcloud')

export default {
  name: 'Hello',
  data() {
    return {
      limit: 100,
      showLimit: 6,
      wordList: [],
      wordLoading: false,
      chartLoading: false,
      currentWord: '',
      queryParams: 'i',
      allWords: []
    }
  },
  mounted() {
    // this.drawLine()
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.wordLoading = true
      list({ limit: this.limit }).then(response => {
        this.allWords = response.data
        this.wordList = response.data.slice(0, this.showLimit)
        this.handleCurrentChange(this.wordList[0])
        this.wordLoading = false
        this.drawLine(response.data)
      }).catch(() => {
        this.wordLoading = false
      })
    },
    handleCurrentChange(val) {
      this.currentWord = val
      this.getStat(val, 'I')
    },
    getStat(val, type) {
      this.chartLoading = true
      stat({ keyword: val.word, type: type }).then(response => {
        this.hotWordLine(val, response.data)
        this.chartLoading = false
      }).catch(() => {
        this.chartLoading = false
      })
    },
    hotWordLine(val, data) {
      const dateList = data.map(function(item) {
        return item[0]
      })
      var valueList = data.map(function(item) {
        return item[1]
      })
      const hotWordLine = echarts.init(document.getElementById('line_chart'))
      const option = {

        // Make gradient line here
        visualMap: [{
          show: false,
          type: 'continuous',
          seriesIndex: 0,
          min: 0,
          max: 400
        }],

        title: [{
          left: 'center',
          text: '"' + val.word + '"热词统计'
        }],
        tooltip: {
          trigger: 'axis'
        },
        xAxis: [{
          data: dateList
        }],
        yAxis: [{
          splitLine: { show: false }
        }],
        grid: [{
          top: '50px',
          left: '50px',
          right: '15px',
          bottom: '50px'
        }],
        series: [{
          type: 'line',
          showSymbol: false,
          data: valueList
        }]
      }
      hotWordLine.setOption(option)
    },
    handleEcharts(val) {
      this.getStat(this.currentWord, val)
    },
    createRandomItemStyle() {
      return {
        normal: {
          fontFamily: 'sans-serif',
          fontWeight: 'bold',
          color: 'rgb(' + [
            Math.round(Math.random() * 256),
            Math.round(Math.random() * 256),
            Math.round(Math.random() * 256)
          ].join(',') + ')'
        }
      }
    },
    drawLine(originData) {
      const data = []
      originData.forEach(element => {
        data.push({
          name: element.word,
          value: element.counts,
          textStyle: this.createRandomItemStyle()
        })
      })
      console.log(2222, data)
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(document.getElementById('myChart'))
      // 绘制图表
      const option = {
        title: {
          text: '热词云图'
        },
        tooltip: {
          show: true
        },
        series: [{
          name: '热词云图',
          type: 'wordCloud',
          size: ['100%', '100%'],
          textRotation: [0, 45, 90, -45],
          textPadding: 0,
          autoSize: {
            enable: true,
            minSize: 14
          },
          data: data
        }]
      }

      // 为echarts对象加载数据
      myChart.setOption(option)
    }
  }
}

</script>
<style scoped>
.grid-content{
  width: 300px;
}
.quick-query{
}
.el-main{
  padding: 0px;
  margin: 0px;
}
</style>
