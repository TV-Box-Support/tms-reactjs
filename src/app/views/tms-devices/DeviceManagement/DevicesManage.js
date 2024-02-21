import { Breadcrumb } from 'app/components';
import { Card, Stack, Typography } from '@mui/material';
import DeviceManageTable from './TableDevices/DevicesManageTable';
import { Container } from 'app/components/TagPage/CustomTag';
import LineChartIn30Days from 'app/views/tms-devices/DeviceManagement/DeviceIn30Days';
const DevicesManage = () => {
  return (
    <Container>
      <Breadcrumb
        routeSegments={[
          { name: 'Devices Manager', path: '/tms-devices/devices-management' },
          { name: 'Devices', path: '/tms-devices/devices-management' },
        ]}
      />
      <Card sx={{ px: 2, py: 2, mb: 2, height: 460 }}>
        <Typography level={3} fontWeight={'bold'}>
          Devices Online 30 days
        </Typography>
        <LineChartIn30Days />
      </Card>
      <Stack spacing={3}>
        <DeviceManageTable />
      </Stack>
    </Container>
  );
};

export default DevicesManage;
