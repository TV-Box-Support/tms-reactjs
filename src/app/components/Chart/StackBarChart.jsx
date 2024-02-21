import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { colors } from 'app/color/color';

const StackBarChart = ({ data, option = {}, legend }) => {
  option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
        },
      },
    },
    legend: {
      data: data.map((item) => item.name),
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    yAxis: {
      type: 'category',
      data: data.map((item) => item.name),
    },
    xAxis: {
      type: 'value',
      minInterval: 1,
    },
    series: [
      {
        name: legend[0],
        type: 'bar',
        stack: 'stack',
        barWidth: '40%',
        itemStyle: {
          color: colors[9],
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 1)',
          },
        },
        data: data.map((item) => item.value1),
      },
      {
        name: legend[1],
        type: 'bar',
        stack: 'stack',
        barWidth: '40%',
        itemStyle: {
          color: colors[6],
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 1)',
          },
        },
        data: data.map((item) => item.value2),
      },
    ],
  };

  return <ReactEcharts minHeight={'400px'} minWidth={'800'} maxWidth={'90%'} option={option} />;
};

export default StackBarChart;
