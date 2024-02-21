import { Breadcrumb } from 'app/components';
import { Card, Stack, Typography } from '@mui/material';
import { Container } from 'app/components/TagPage/CustomTag';
import AppTable from './AppTable/AppTable';
import ApplicationBarChart from './ApplicationBarChart';
const ApplicationManage = () => {
  return (
    <Container>
      <Breadcrumb
        routeSegments={[
          { name: 'Application Manager', path: '/tms-application/application-management' },
          { name: 'Applications', path: '/tms-application/application-management' },
        ]}
      />
      <Stack spacing={3}>
        <Card style={{ overflow: 'auto' }}>
          <Typography
            variant="h6"
            align="left"
            fontWeight="fontWeightBold"
            fontSize={15}
            sx={{ marginTop: '5px', marginLeft: '10px' }}
          >
            Status
          </Typography>
          <ApplicationBarChart />
        </Card>
        <AppTable />
      </Stack>
    </Container>
  );
};

export default ApplicationManage;
