import { Breadcrumb } from 'app/components';
import { useLocation } from 'react-router-dom';
import { Grid, Stack } from '@mui/material';
import { ContentBox } from 'app/components/TagPage/CustomTag';
import ApplicationInfo from './AplicationInfo';
import AppDeviceTable from './AppDeviceTable/AppDeviceTable';
import { Container } from 'app/components/TagPage/CustomTag';
import DeviceNowAppTable from './AppDeviceNowTable/AppDeviceNowTable';
import SingleApplicationPieChartManage from './SingleApplicationPieChartManage';
const SingleApplication = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const appId = searchParams.get('id');
  const appName = searchParams.get('name');

  return (
    <Container>
      <Breadcrumb
        routeSegments={[
          { name: 'Applications Manager', path: '/tms-application/application-management' },
          { name: 'Aplications', path: '/tms-application/application-management' },
          {
            name: `${appName}`,
            path: `/tms-applications/application-management/application?id=${appId}&name=${appName}`,
          },
        ]}
      />
      <Stack spacing={5}>
        <ContentBox className="analytics">
          <Grid container spacing={1} alignItems="stretch">
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <ApplicationInfo id={appId} />
            </Grid>
            <Grid item lg={8} md={8} sm={12} xs={12}>
              <SingleApplicationPieChartManage id={appId} />
            </Grid>
          </Grid>
          <Grid item>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <DeviceNowAppTable id={appId} />
            </Grid>
          </Grid>
          <br />
          <Grid item>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <AppDeviceTable id={appId} />
            </Grid>
          </Grid>
        </ContentBox>
      </Stack>
    </Container>
  );
};

export default SingleApplication;
