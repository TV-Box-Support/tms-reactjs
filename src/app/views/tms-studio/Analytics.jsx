import { Card, Grid, Stack } from '@mui/material';
import { Breadcrumb } from 'app/components';
import PieChartManage from './summary/pieChart/PieChartManage';
import DeviceManageTable from './summary/table/DeviceManagement/TableDevices/DevicesManageTable';
import ListCards from './summary/card/ListCards.jsx';
import HistoryOnlineBarChart from './summary/barChart/HistoryOnlineBarChart';
import { ContentBox } from 'app/components/TagPage/CustomTag';
import { titleStyle, Title } from 'app/components/Chart/ChartTitle';
import { Container } from 'app/components/TagPage/CustomTag';

const Analytics = () => {
  // const { palette } = useTheme();
  return (
    <Container>
      <Breadcrumb routeSegments={[{ name: 'Terminal Studio' }]} />
      <Stack spacing={3}>
        <ContentBox className="analytics">
          <Grid container spacing={1}>
            <Grid item lg={8} md={8} sm={8} xs={12}>
              <Card sx={{ px: 2, py: 2, mb: 2 }}>
                <ListCards />
              </Card>
              <Card sx={{ px: 2, py: 2, mb: 2 }}>
                <Title level={3} style={titleStyle}>
                  History Online 7 days
                </Title>
                <HistoryOnlineBarChart />
              </Card>
              <Card sx={{ px: 2, py: 2, mb: 2 }}>
                <Title level={3} style={titleStyle}>
                  Active devices
                </Title>
                <DeviceManageTable />
              </Card>
            </Grid>
            <Grid item lg={4} md={4} sm={4} xs={12}>
              <PieChartManage />
            </Grid>
          </Grid>
        </ContentBox>
      </Stack>
    </Container>
  );
};

export default Analytics;
