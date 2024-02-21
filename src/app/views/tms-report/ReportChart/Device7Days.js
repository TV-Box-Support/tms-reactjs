import React, { useEffect, useState } from 'react';
import BarChart from 'app/components/Chart/BarChart';
import { getDeviceIn7DaysBarChart } from 'app/Services/StudioServices';

const Device7Days = ({ id }) => {
  const [data, setData] = useState([]);
  const [updateList, setUpdateList] = useState(true);

  const handleGetHistoryOnline = async () => {
    let response = await getDeviceIn7DaysBarChart(id);
    console.log(response);
    if (response.status === 200) {
      let output = [...response.data.map(({ date, value }) => [date, value])];
      setData(output);
    }
  };
  useEffect(() => {
    if (updateList) {
      handleGetHistoryOnline();
      setUpdateList(false);
    }
  }, [updateList]);

  return <BarChart data={data} legend={'Device usage time(minutes)'} />;
};

export default Device7Days;
