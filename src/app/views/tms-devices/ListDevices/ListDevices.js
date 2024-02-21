import { Breadcrumb } from 'app/components';
import { Stack } from '@mui/material';
import { Container } from 'app/components/TagPage/CustomTag';
import ListDevicesTable from './ListDevicesTable/ListDevicesTable';
const ListDevices = () => {
  return (
    <Container>
      <Breadcrumb
        routeSegments={[
          { name: 'Devices Manager', path: '/tms-devices/devices-management' },
          { name: 'List Devices', path: '/tms-devices/list-devices' },
        ]}
      />
      <Stack spacing={3}>
        <ListDevicesTable />
      </Stack>
    </Container>
  );
};

export default ListDevices;
