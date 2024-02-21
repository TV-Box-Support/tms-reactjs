import React, { useEffect, useState } from 'react';
import { getSinglePolicyPieChart } from 'app/Services/StudioServices';
import { Card, Grid } from '@mui/material';
import { titleStyle, Title } from 'app/components/Chart/ChartTitle';
import PieChart from 'app/components/Chart/PieChart';

const SinglePolicyPieChartManage = ({ id }) => {
  const [status, setStatus] = useState([]);
  // const [action, setAction] = useState([]);

  const handleGetStatus = async () => {
    let response = await getSinglePolicyPieChart(id);
    console.log(response);
    if (response.status === 200) {
      setStatus(response.data);
    }
  };

  // const handleGetAction = async () => {
  //   let response = await getPolicyPieChart('action');
  //   console.log(response);
  //   if (response.status === 200) {
  //     setAction(response.data);
  //   }
  // };

  useEffect(() => {
    handleGetStatus();
    // handleGetAction();
    const intervalId = setInterval(() => {
      handleGetStatus();
      // handleGetAction();
    }, 180000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Grid lg={12} md={12} sm={12} xs={12}>
      <Card sx={{ px: 1, py: 0, mb: 0, height: '85%', width: '100%' }}>
        <Title level={3} style={titleStyle}>
          Status
        </Title>
        <PieChart data={status} name={'Single Policy Status'} />
      </Card>
    </Grid>
  );
};

export default SinglePolicyPieChartManage;
