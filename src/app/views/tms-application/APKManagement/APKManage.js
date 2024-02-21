import APKManageTable from './Table/APKManageTable';
import { Breadcrumb } from 'app/components';
import { Stack } from '@mui/material';
import { Container } from 'app/components/TagPage/CustomTag';
const APKManage = () => {
  return (
    <Container>
      <Breadcrumb
        routeSegments={[
          { name: 'Application Managers', path: '/tms-application/application-management' },
          { name: 'APK', path: '/tms-application/apk-management' },
        ]}
      />
      <Stack spacing={3}>
        <APKManageTable />
      </Stack>
    </Container>
  );
};

export default APKManage;
