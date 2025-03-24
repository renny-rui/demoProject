<template>
  <div class="echarts-container" ref="chart"></div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'EChartsComponent',
  props: {
    options: {
      type: Object,
      required: true
    },
    theme: {
      type: String,
      default: 'dark'
    },
    autoResize: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      chart: null
    };
  },
  watch: {
    options: {
      handler(newOptions) {
        this.updateChart(newOptions);
      },
      deep: true
    }
  },
  mounted() {
    this.initChart();
    if (this.autoResize) {
      window.addEventListener('resize', this.resizeChart);
    }
  },
  beforeDestroy() {
    if (this.autoResize) {
      window.removeEventListener('resize', this.resizeChart);
    }
    this.destroyChart();
  },
  methods: {
    initChart() {
      if (!this.chart) {
        this.chart = echarts.init(this.$refs.chart, this.theme);
      }
      this.updateChart(this.options);
    },
    updateChart(options) {
      if (this.chart) {
        this.chart.setOption(options, true);
      }
    },
    resizeChart() {
      if (this.chart) {
        this.chart.resize();
      }
    },
    destroyChart() {
      if (this.chart) {
        this.chart.dispose();
        this.chart = null;
      }
    }
  }
};
</script>

<style scoped>
.echarts-container {
  width: 100%;
  height: 100%;
  min-height: 120px; /* 减小最小高度 */
}
</style>
