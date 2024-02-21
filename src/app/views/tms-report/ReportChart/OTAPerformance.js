import React, { useState, useEffect } from 'react';
import LineChart from 'app/components/Chart/LineChar';
import { Card } from '@mui/material';
import { getSingleDeviceReportPieChart } from 'app/Services/StudioServices';
import { SimpleCard } from 'app/components';

const OTAPerformance = (props) => {
  const { id, diffInDays } = props;
  const [updateList, setUpdateList] = useState(true);
  const [CPU, setCPU] = useState([]);
  const [Memory, setMemory] = useState([]);
  const [Date, setDate] = useState([]);

  const handleLoadDeviceData = async () => {
    let response = await getSingleDeviceReportPieChart(id, 'com.vnptt.ota', diffInDays);
    console.log(response);
    if (response.status === 200) {
      // console.log(response);
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
      setTimeout(() => {
        handleLoadDeviceData();
        setUpdateList(false);
      }, 3000);
    }
  }, [updateList]);

  return (
    CPU.length === 480 && (
      <Card style={{ height: '100%', overflow: 'auto', minHeight: '100%' }}>
        <SimpleCard title="OTA Performance">
          <LineChart data1={CPU} data2={Memory} data3={Date} legend={['CPU (%)', 'Memory (%)']} />
        </SimpleCard>
      </Card>
    )
  );
};
export default OTAPerformance;
