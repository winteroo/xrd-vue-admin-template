<template>
  <div
    ref="chartId"
    :class="chartClass"
    class="chart"/>
</template>

<script>
import echarts from 'echarts';
export default {
  name: 'EChart',
  props: {
    option: {
      type: Object,
      required: true
    },
    chartClass: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      myChart: null
    };
  },
  watch: {
    option: {
      handler (n, o) {
        this.myChart.setOption(n);
      },
      deep: true
    }
  },
  mounted () {
    this.setCanvas();
    window.addEventListener('resize', this.resizeEvent, false);
  },
  methods: {
    setCanvas () {
      this.myChart = echarts.init(this.$refs.chartId, 'light');
      this.myChart.setOption(this.option);
    },
    resizeEvent () {
      this.myChart.resize();
    }
  }
};
</script>

<style lang="scss" scoped>
.chart {
  height: 100%;
  min-height: 100px;
}
</style>
