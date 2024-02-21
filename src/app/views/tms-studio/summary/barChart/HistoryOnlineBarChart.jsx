import React, { useEffect, useState } from 'react';
import BarChart from 'app/components/Chart/BarChart';
import { getStudioHistoryOnlineBarChart } from 'app/Services/StudioServices';

const HistoryOnlineBarChart = () => {
  const [historyOnline, setHistoryOnline] = useState([]);

  const handleGetHistoryOnline = async () => {
    let response = await getStudioHistoryOnlineBarChart();
    if (response.status === 200) {
      let output = [...response.data.map(({ date, devicenumber }) => [date, devicenumber])];

      setHistoryOnline(output);
    }
  };
  useEffect(() => {
    handleGetHistoryOnline();
    const intervalId = setInterval(() => {
      handleGetHistoryOnline();
    }, 180000);
    return () => clearInterval(intervalId);
  }, []);

  return <BarChart data={historyOnline} legend={'Devices number'} />;
};

export default HistoryOnlineBarChart;
