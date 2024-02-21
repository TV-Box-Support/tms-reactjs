import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { colors } from 'app/color/color';
const BarChart = ({ data, height = '350px', width = '100%', option = {}, legend }) => {
  const color = colors;

  const generateItemStyle = (color) => {
    return {
      normal: {
        color: color,
      },
    };
  };
  option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
        },
      },
      dataset: {
        source: data,
      },
    },
    legend: {
      data: legend,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: true,
        data: data.map((item) => Object.values(item)[0]),
      },
    ],
    yAxis: [
      {
        type: 'value',
        minInterval: 1,
      },
    ],
    series: [
      {
        name: legend,
        type: 'bar',
        stack: 'Total',
        barWidth: '40%',
        emphasis: {
          focus: 'series',
        },
        itemStyle: {
          color: colors[9],
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 1)',
          },
        },
        data: data.map((item, index) => {
          return {
            value: Object.values(item)[1],
            itemStyle: generateItemStyle(color[index + 5]),
          };
        }),
      },
    ],
  };

  return <ReactEcharts height={height} width={width} option={option} />;
};

export default BarChart;
