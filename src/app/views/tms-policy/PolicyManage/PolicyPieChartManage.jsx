import React, { useEffect, useState } from 'react';
import { getPolicyPieChart } from 'app/Services/StudioServices';
import { Card, Grid } from '@mui/material';
import { titleStyle, Title } from 'app/components/Chart/ChartTitle';
import PieChart from 'app/components/Chart/PieChart';

const PolicyPieChartManage = () => {
  const [status, setStatus] = useState([]);
  const [action, setAction] = useState([]);

  const handleGetStatus = async () => {
    let response = await getPolicyPieChart('status');
    if (response.status === 200) {
      setStatus(response.data);
    }
  };

  const handleGetAction = async () => {
    let response = await getPolicyPieChart('action');
    if (response.status === 200) {
      setAction(response.data);
    }
  };

  useEffect(() => {
    handleGetStatus();
    handleGetAction();
    const intervalId = setInterval(() => {
      handleGetStatus();
      handleGetAction();
    }, 180000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Grid container spacing={1}>
      <Grid item lg={6} md={6} sm={6} xs={12}>
        <Card sx={{ px: 1, py: 1, mb: 1 }}>
          <Title level={3} style={titleStyle}>
            Status
          </Title>
          <PieChart data={status} name={'Policy Status'} />
        </Card>
      </Grid>
      <Grid item lg={6} md={6} sm={6} xs={12}>
        <Card sx={{ px: 1, py: 1, mb: 1 }}>
          <Title level={3} style={titleStyle} mt={2}>
            Action
          </Title>
          <PieChart data={action} name={'Policy action'} />
        </Card>
      </Grid>
    </Grid>
  );
};

export default PolicyPieChartManage;
