import React, { useEffect, useState } from 'react';
import { getStudioDeviceIn30DaysLineChart } from 'app/Services/StudioServices';
import LineChart1 from 'app/components/Chart/LineChart1';

const LineChartIn30Days = () => {
  const [arr, setArr] = useState([]);

  const handleGetHistoryOnline = async () => {
    let response = await getStudioDeviceIn30DaysLineChart();
    if (response.status === 200) {
      function formatDate(dateString) {
        const [year, month, day] = dateString.split('-');
        return `${day}-${month}-${year}`;
      }
      const formattedData = response.data.map((item) => ({
        date: formatDate(item.date),
        value: item.value,
      }));
      setArr(formattedData);
    }
  };
  useEffect(() => {
    handleGetHistoryOnline();
  }, []);

  return <LineChart1 data={arr} legend={['Numbers of device']} />;
};

export default LineChartIn30Days;
