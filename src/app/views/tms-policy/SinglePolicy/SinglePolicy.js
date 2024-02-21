import { Breadcrumb } from 'app/components';
import { useLocation } from 'react-router-dom';
import PolicyAPKTable from './PolicyAPKTable/PolicyAPKTable';
import { Stack, Grid } from '@mui/material';
import { Container } from 'app/components/TagPage/CustomTag';
import { ContentBox } from 'app/components/TagPage/CustomTag';
import PolicyInfo from './PolicyInfo';
import PolicDevicesTable from './PolicyDeviceTable/PolicydDeviceTable';
import SinglePolicyPieChartManage from './SinglePolicyPieChartManage';
import DevicePolicyTable from './DevicePolicyTable/DevicesPolicyTable';
const SinglePolicy = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const policyId = searchParams.get('id');
  const policyName = searchParams.get('pn');
  const commandName = searchParams.get('cn');

  return (
    <Container>
      <Breadcrumb
        routeSegments={[
          { name: 'Policy Manager', path: '/tms-policy/apk-management' },
          { name: 'Policy', path: '/tms-policy/policy-management' },
          {
            name: `${policyName}`,
            path: `/tms-policy/policy-management/policy?id=${policyId}&pn=${policyName}&cn=${commandName}`,
          },
        ]}
      />
      <Stack spacing={3}>
        <ContentBox className="analytics">
          <Grid container spacing={2} sx={{ mb: 2 }} alignItems="stretch">
            <Grid item lg={6} md={6} sm={6} xs={12} spacing={1}>
              <PolicyInfo id={policyId} />
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={12} spacing={1}>
              <SinglePolicyPieChartManage id={policyId} />
            </Grid>
          </Grid>
          <Grid container spacing={2} flexDirection="row">
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <PolicyAPKTable id={policyId} />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <PolicDevicesTable id={policyId} />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <DevicePolicyTable id={policyId} />
            </Grid>
          </Grid>
        </ContentBox>
      </Stack>
    </Container>
  );
};

export default SinglePolicy;
