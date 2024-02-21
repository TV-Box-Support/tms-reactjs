import React, { useEffect, useState } from 'react';
import { getStudioOnlinePieChart } from 'app/Services/StudioServices';
import PieChart from '../../../../components/Chart/PieChart';
import { Card } from '@mui/material';
import { titleStyle, Title } from 'app/components/Chart/ChartTitle';

const PieChartManage = () => {
  const [Online, setOnline] = useState([]);
  const [resolution, setResolution] = useState([]);
  const [network, setNetwork] = useState([]);
  //   const [Summary, setSummary] = useState(false);

  const handleGetOnline = async () => {
    let response = await getStudioOnlinePieChart('online');
    if (response.status === 200) {
      setOnline(response.data);
      //   setSummary(true);
    }
  };

  const handleGetNetwork = async () => {
    let response = await getStudioOnlinePieChart('network');
    if (response.status === 200) {
      setNetwork(response.data);
    }
  };

  const handleGetResolution = async () => {
    let response = await getStudioOnlinePieChart('hdmi');
    if (response.status === 200) {
      setResolution(response.data);
    }
  };

  useEffect(() => {
    handleGetOnline();
    handleGetResolution();
    handleGetNetwork();
    const intervalId = setInterval(() => {
      handleGetOnline();
      handleGetResolution();
      handleGetNetwork();
    }, 180000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <Card sx={{ px: 1, py: 1, mb: 1 }}>
        <Title level={3} style={titleStyle}>
          Online
        </Title>
        <PieChart data={Online} name={'Online'} />
      </Card>
      <Card sx={{ px: 1, py: 1, mb: 1 }}>
        <Title level={3} style={titleStyle} mt={2}>
          Resolution
        </Title>
        <PieChart data={resolution} name={'Resolution'} />
      </Card>
      <Card sx={{ px: 1, py: 1, mb: 1 }}>
        <Title level={3} style={titleStyle} mt={2}>
          Network
        </Title>
        <PieChart data={network} name={'Network'} />
      </Card>
    </>
  );
};

export default PieChartManage;
