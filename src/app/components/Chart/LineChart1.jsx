import React from 'react';
import ReactEcharts from 'echarts-for-react';

const LineChart = ({ data, legend }) => {
  const option = {
    grid: { top: '10%', bottom: '25%', left: '5%', right: '5%' },
    legend: {
      itemGap: 0,
      color: '#115293',
      textStyle: { fontSize: 13, fontFamily: 'roboto' },
      data: legend,
    },
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      data: data.map((item) => item.date),
      axisLine: { show: true },
      axisTick: { show: false },
      axisLabel: {
        fontSize: 14,
        fontFamily: 'roboto',
        show: true,
        rotate: 45,
      },
      boundaryGap: false,
    },
    yAxis: {
      type: 'value',
      axisLine: { show: true },
      axisTick: {
        show: true,
        alignWithLabel: true,
      },
      splitLine: {
        lineStyle: { color: '#115293', opacity: 0.15 },
      },
      axisLabel: { fontSize: 13, fontFamily: 'roboto' },
      minInterval: 1,
      boundaryGap: false,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    series: [
      {
        data: data.map((item) => item.value),
        type: 'line',
        stack: legend[0],
        name: legend[0],
        smooth: true,
        symbolSize: 1,
        lineStyle: { width: 2, color: '#115293' },
        areaStyle: { color: '#115293' },
      },
    ],
  };

  return <ReactEcharts option={option} style={{ height: '450px' }} />;
};

export default LineChart;
