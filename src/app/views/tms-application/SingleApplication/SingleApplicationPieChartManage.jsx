import React, { useEffect, useState } from 'react';
import { getSingleApplicationPieChart } from 'app/Services/StudioServices';
import { Card, Grid } from '@mui/material';
import { titleStyle, Title } from 'app/components/Chart/ChartTitle';
import PieChart from 'app/components/Chart/PieChart';

const SingleApplicationPieChartManage = ({ id }) => {
  const [install, setInstall] = useState([]);
  const [active, setActive] = useState([]);

  const handleGetInstall = async () => {
    let response = await getSingleApplicationPieChart(id, 'install');
    console.log(response);
    if (response.status === 200) {
      setInstall(response.data);
    }
  };

  const handleGetActive = async () => {
    let response = await getSingleApplicationPieChart(id, 'active');
    console.log(response);
    if (response.status === 200) {
      setActive(response.data);
    }
  };

  useEffect(() => {
    handleGetInstall();
    handleGetActive();
    const intervalId = setInterval(() => {
      handleGetInstall();
      handleGetActive();
    }, 180000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Grid container spacing={1}>
      <Grid item lg={6} md={6} sm={6} xs={12}>
        <Card sx={{ px: 0, py: 0, mb: 2, height: '90%', width: '100%' }}>
          <Title level={3} style={titleStyle}>
            Status
          </Title>
          <PieChart data={install} name={'Installed'} />
        </Card>
      </Grid>
      <Grid item lg={6} md={6} sm={6} xs={12}>
        <Card sx={{ px: 0, py: 0, mb: 2, height: '90%', width: '100%' }}>
          <Title level={3} style={titleStyle}>
            Status
          </Title>
          <PieChart data={active} name={'Activated'} />
        </Card>
      </Grid>
    </Grid>
  );
};

export default SingleApplicationPieChartManage;
