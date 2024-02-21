import React, { useEffect, useState } from 'react';
import { getApplicationBarChart } from 'app/Services/StudioServices';
import StackBarChart from 'app/components/Chart/StackBarChart';

const ApplicationBarChart = () => {
  const [arr, setArr] = useState([]);

  const handleGetData = async () => {
    let response = await getApplicationBarChart();
    console.log(response);
    if (response.status === 200) {
      setArr(response.data);
    }
  };
  useEffect(() => {
    handleGetData();
    const intervalId = setInterval(() => {
      handleGetData();
    }, 180000);
    return () => clearInterval(intervalId);
  }, []);

  return <StackBarChart data={arr} legend={['Unconnected Devices', 'Connecting Devices']} />;
};

export default ApplicationBarChart;
