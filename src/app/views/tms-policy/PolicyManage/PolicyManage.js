import { Breadcrumb } from 'app/components';
import { Stack } from '@mui/material';
import { Container } from 'app/components/TagPage/CustomTag';
import PolicyManagementTable from './PolicyManageTable/PolicyManageTable';
import PolicyPieChartManage from './PolicyPieChartManage';
const PolicyManage = () => {
  return (
    <Container>
      <Breadcrumb
        routeSegments={[
          { name: 'Policy Manager', path: '/tms-policy/policy-management' },
          { name: 'Policy', path: '/tms-policy/policy-management' },
        ]}
      />
      <Stack spacing={3}>
        <PolicyPieChartManage />
        <PolicyManagementTable />
      </Stack>
    </Container>
  );
};

export default PolicyManage;
