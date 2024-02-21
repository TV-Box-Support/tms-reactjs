import UserManageTable from './Table/UserManageTable';
import { Breadcrumb } from 'app/components';
import { Stack } from '@mui/material';
import { Container } from 'app/components/TagPage/CustomTag';
const UserManage = () => {
  return (
    <Container>
      <Breadcrumb routeSegments={[{ name: 'User Managers', path: '/tms-admin/user-management' }]} />
      <Stack spacing={3}>
        <UserManageTable />
      </Stack>
    </Container>
  );
};

export default UserManage;
