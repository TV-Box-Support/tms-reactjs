import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { useTheme } from '@mui/system';

const LineChart = (props) => {
  const { data1, data2, data3, legend } = props;
  const theme = useTheme();

  const option = {
    grid: { top: '10%', bottom: '5%', left: '5%', right: '5%' },
    legend: {
      itemGap: 20,
      icon: 'circle',
      textStyle: { color: theme.palette.text.secondary, fontSize: 13, fontFamily: 'roboto' },
      data: legend,
    },
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      data: data3,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        fontSize: 14,
        fontFamily: 'roboto',
        color: theme.palette.text.secondary,
        show: false,
      },
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      // max: 100,
      splitLine: {
        lineStyle: { color: theme.palette.text.secondary, opacity: 0.15 },
      },
      axisLabel: { color: theme.palette.text.secondary, fontSize: 13, fontFamily: 'roboto' },
    },
    dataZoom: [
      {
        type: 'inside',
        xAxisIndex: [0],
        filterMode: 'filter',
      },
      {
        type: 'slider',
        xAxisIndex: [0],
        height: 20,
        bottom: 5,
        filterMode: 'filter',
      },
    ],
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    series: [
      {
        data: data1,
        type: 'line',
        stack: legend[0],
        name: legend[0],
        smooth: true,
        symbolSize: 1,
        lineStyle: { width: 2 },
      },
      {
        data: data2,
        type: 'line',
        stack: legend[1],
        name: legend[1],
        smooth: true,
        symbolSize: 1,
        lineStyle: { width: 2 },
      },
    ],
  };

  return <ReactEcharts option={option} style={{ height: '350px', minHeight: '80%' }} />;
};

export default LineChart;
