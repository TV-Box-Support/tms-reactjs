import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { colors } from 'app/color/color';
const PieChart = ({ data, height = '350px', option = {}, name }) => {
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
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        name: name,
        type: 'pie',
        radius: ['40%', '75%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center',
          fontSize: 15,
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 15,
            fontWeight: 'bold',
            formatter: `{b} \n{d}%`,
          },
        },
        labelLine: {
          show: false,
        },
        data: data.map((item, index) => {
          return {
            value: item.value,
            name: item.name,
            itemStyle: generateItemStyle(color[index + 5]),
          };
        }),
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 1)',
          },
        },
      },
    ],
    ...option,
  };

  return <ReactEcharts height={height} option={option} />;
};

export default PieChart;
