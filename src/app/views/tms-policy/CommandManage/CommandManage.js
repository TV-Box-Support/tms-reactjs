import { Breadcrumb } from 'app/components';
import { Stack } from '@mui/material';
import { Container } from 'app/components/TagPage/CustomTag';
import CommandManagementTable from './CommandManageTable/CommandManageTable';
const PolicyManage = () => {
  return (
    <Container>
      <Breadcrumb
        routeSegments={[
          { name: 'Policy Manager', path: '/tms-policy/policy-management' },
          { name: 'Command', path: '/tms-policy/command-management' },
        ]}
      />
      <Stack spacing={3}>
        <CommandManagementTable />
      </Stack>
    </Container>
  );
};

export default PolicyManage;
