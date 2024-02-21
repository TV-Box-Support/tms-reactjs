import { Grid } from '@mui/material';
import StatCard from '../../../../components/Card/StatCard';
import { getSummaryforStudio } from 'app/Services/StudioServices';
import { useEffect, useState } from 'react';

const ListCards = () => {
  const [total, setTotal] = useState();
  const [online, setOnline] = useState();
  const [last7days, setLast7Days] = useState();
  const [last30days, setLast30Days] = useState();
  // const [Summary, setSummary] = useState(false);

  const handleGetSummary = async () => {
    let response = await getSummaryforStudio();
    // console.log(response);
    if (response.status === 200) {
      setTotal(response.data.total);
      setOnline(response.data.online);
      setLast7Days(response.data.last7day);
      setLast30Days(response.data.last30day);
      // setSummary(true);
    }
  };

  useEffect(() => {
    handleGetSummary(); // Call handleGetSummary once when component mounts
    const intervalId = setInterval(() => {
      handleGetSummary(); // Call handleGetSummary every 3 minutes
    }, 180000);
    return () => clearInterval(intervalId); // Clear the interval on unmount
  }, []);
  // useEffect(() => {
  //   if (Summary) {
  //     console.log('Summary: ', total, online, last30days, last7days);
  //     setSummary(false);
  //   }
  // }, [Summary]);
  return (
    <Grid container spacing={2} sx={{ mb: 2 }}>
      <Grid item xs={12} sm={12} lg={3} xl={3}>
        <StatCard label={'Total'} num={total} color={'#5886b3'} />
      </Grid>
      <Grid item xs={12} sm={12} lg={3} xl={3}>
        <StatCard label={'Online'} num={online} color={'#4175a9'} />
      </Grid>{' '}
      <Grid item xs={12} sm={12} lg={3} xl={3}>
        <StatCard label={'7 days'} num={last7days} color={'#29639e'} />
      </Grid>{' '}
      <Grid item xs={12} sm={12} lg={3} xl={3}>
        <StatCard label={'30 days'} num={last30days} color={'#115293'} />
      </Grid>
    </Grid>
  );
};

export default ListCards;
