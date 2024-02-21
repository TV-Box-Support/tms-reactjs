import { Breadcrumb } from 'app/components';
import { useLocation } from 'react-router-dom';
import { Grid, Stack } from '@mui/material';
import { Container } from 'app/components/TagPage/CustomTag';
import { ContentBox } from 'app/components/TagPage/CustomTag';
import DeviceInfo from './DeviceInfo';
import DevicePerformance from './DevicePerformance';
import DeviceAppTable from './DeviceAppTable/DevicesAppTable';
import DevicePolicyTable from './DevicePolicyTable/DevicesPolicyTable';
const SingleDevice = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const deviceId = searchParams.get('id');
  const deviceSn = searchParams.get('sn');

  return (
    <Container>
      <Breadcrumb
        routeSegments={[
          { name: 'Devices Manager', path: '/tms-devices/devices-management' },
          { name: 'Devices', path: '/tms-devices/devices-management' },
          {
            name: `${deviceSn}`,
            path: `/tms-devices/devices-management/device?id=${deviceId}&sn=${deviceSn}`,
          },
        ]}
      />
      <Stack spacing={3}>
        <ContentBox className="analytics">
          <Grid container spacing={2} sx={{ mb: 2 }} alignItems="stretch">
            <Grid item lg={3} md={3} sm={3} xs={12}>
              <DeviceInfo id={deviceId} />
            </Grid>
            <Grid item lg={9} md={9} sm={9} xs={12}>
              <DevicePerformance id={deviceId} />
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <DeviceAppTable deviceID={deviceId} />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <DevicePolicyTable deviceID={deviceId} />
            </Grid>
          </Grid>
        </ContentBox>
      </Stack>
    </Container>
  );
};

export default SingleDevice;
