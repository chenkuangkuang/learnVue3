<template>
  <div class="echarts-container">
    <el-tabs v-model="activeName" @tab-click="handleTabClick">
      <el-tab-pane label="企业（户）" name="0"></el-tab-pane>
      <el-tab-pane label="投资额（万元）" name="1"></el-tab-pane>
    </el-tabs>
    <div id="echarts"></div>
  </div>
</template>

<script>
import industryJosn from "./industry.json";
import * as echarts from "echarts";
import useEchartsOption from "./EchartsOption";
export default {
  name: "IndustryChartsCom",
  props: [""],
  data() {
    return {
      activeName: "0",
    };
  },
  mounted() {
    this.renderCharts();
  },
  methods: {
    renderCharts() {
      console.log('renderCharts', this.activeName);
      var chartDom = document.getElementById("echarts");
      var myChart = echarts.init(chartDom);
      const keyArr = Object.keys(industryJosn);
      const data = industryJosn[keyArr[this.activeName]];
      var { echartsOption } = useEchartsOption(data, this.activeName, "");
      console.log("echartsOption", echartsOption);
      echartsOption && myChart.setOption(echartsOption);
    },
    handleTabClick(tab, event) {
      console.log(tab, event);
      console.log("activeName", this.activeName);
      this.renderCharts();
    },
  },
};
</script>

<style scoped>
.echarts-container {
  position: absolute;
  left: 50px;
  top: 50px;
  width: 400px;
  /* height: 650px; */
  background: #fff;
  z-index: 999;
  padding: 10px;
}
#echarts {
  width: 400px;
  height: 650px;
  overflow-y: auto;
}
</style>
