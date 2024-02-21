import React, { useState, useEffect } from 'react';
import { getADevicePerformance } from 'app/Services/DevicesServices';
import LineChart from 'app/components/Chart/LineChar';
import { Card } from '@mui/material';
import { SimpleCard } from 'app/components';

const DevicePerformance = (props) => {
  const { id, diffInDays } = props;
  const [updateList, setUpdateList] = useState(true);
  const [CPU, setCPU] = useState([]);
  const [Memory, setMemory] = useState([]);
  const [Date, setDate] = useState([]);

  const handleLoadDeviceData = async () => {
    let response = await getADevicePerformance(id, diffInDays);
    if (response.status === 200) {
      console.log(response);
      let arr = response.data;
      let newCPU = [];
      let newMemory = [];
      let newDate = [];
      for (let i = 0; i < arr.length; i++) {
        newCPU.push(parseFloat(arr[i].cpu));
        newMemory.push(parseFloat(arr[i].memory));
        newDate.push(arr[i].date);
      }
      setCPU(newCPU);
      setMemory(newMemory);
      setDate(newDate);
    }
  };

  useEffect(() => {
    setUpdateList(true);
  }, [diffInDays]);

  useEffect(() => {
    if (updateList) {
      handleLoadDeviceData();
      setUpdateList(false);
    }
  }, [updateList]);

  return (
    <Card style={{ height: '100%', overflow: 'auto', minHeight: '100%' }}>
      <SimpleCard title="Device Performance">
        <LineChart data1={CPU} data2={Memory} data3={Date} legend={['CPU (%)', 'Memory (%)']} />
      </SimpleCard>
    </Card>
  );
};
export default DevicePerformance;
