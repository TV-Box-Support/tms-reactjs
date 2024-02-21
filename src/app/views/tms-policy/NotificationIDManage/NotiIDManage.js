import { Breadcrumb } from 'app/components';
import { Stack } from '@mui/material';
import { Container } from 'app/components/TagPage/CustomTag';
import NotiIDManagementTable from './NotificationIDTable/NotiIDManageTable';
const PolicyManage = () => {
  return (
    <Container>
      <Breadcrumb
        routeSegments={[
          { name: 'Policy Manager', path: '/tms-policy/policy-management' },
          { name: 'Notification', path: '/tms-policy/notificationID-management' },
        ]}
      />
      <Stack spacing={3}>
        <NotiIDManagementTable />
      </Stack>
    </Container>
  );
};

export default PolicyManage;
