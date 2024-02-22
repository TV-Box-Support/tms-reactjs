import { Box, Button, Grid } from '@mui/material';
import Breadcrumb from 'app/components/Breadcrumb';
import SimpleCard from 'app/components/Card/SimpleCard';
import { Container } from 'app/components/TagPage/CustomTag';
import { SearchBox } from 'app/components/TmsSearchBox';
import { useRef, useState } from 'react';
import BasicDatePicker from 'app/components/BasicDatePicker';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import DeviceInfo from './ReportChart/DeviceInfo';
import DevicePerformance from './ReportChart/DevicePerformance';
import DeviceAppTable from '../tms-devices/SingleDevice/DeviceAppTable/DevicesAppTable';
import DevicePolicyTable from '../tms-devices/SingleDevice/DevicePolicyTable/DevicesPolicyTable';
import OTAPerformance from './ReportChart/OTAPerformance';
import TR069Performance from './ReportChart/TR069Performance';
import UAPerformance from './ReportChart/UAPerformance copy';
import Device7Days from './ReportChart/Device7Days';
import { useReactToPrint } from 'react-to-print';

const Report = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptionCP, setSelectedOptionCP] = useState(null);
  const [diffInDays, setDiffInDays] = useState();
  const [show, setShow] = useState(false);

  const printRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });
  const handleGetReport = () => {
    setShow(true);
  };

  useEffect(() => {
    if (show) {
      if (!selectedOption) {
        toast.error('Select Devices');
        setShow(false);
        return;
      }
    }
  }, [show]);

  useEffect(() => {
    if (selectedOption) {
      setSelectedOptionCP(selectedOption);
    }
    if (!selectedOption) {
      setShow(false);
      setSelectedOptionCP(null);
    }
  }, [selectedOption]);

  return (
    <Container ref={printRef}>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: 'Analytics' }, { name: 'Report' }]} />
      </Box>
      <Grid container spacing={1}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <SimpleCard title="Search Devices">
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <SearchBox selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
            </Grid>
            {/* <Box sx={{ py: '12px' }} /> */}
            <Grid item lg={12} md={12} sm={12} xs={12}>
              {selectedOption && (
                <>
                  <Box sx={{ py: '10px' }} />
                  <DeviceInfo id={selectedOption.id} />
                  <Box sx={{ py: '10px' }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <BasicDatePicker setDiffInDays={setDiffInDays} />
                    <Button variant="contained" onClick={handleGetReport} sx={{ height: '60%' }}>
                      Get Report
                    </Button>
                  </Box>
                  <Box sx={{ py: '10px' }} />
                </>
              )}
            </Grid>
          </SimpleCard>
        </Grid>
      </Grid>
      <Box sx={{ py: '12px' }} />
      {show && (
        <Grid container spacing={1}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <SimpleCard title="Device usage time">
              <Device7Days id={selectedOptionCP.id} />
            </SimpleCard>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <DevicePerformance id={selectedOptionCP.id} diffInDays={diffInDays} />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <OTAPerformance id={selectedOptionCP.id} diffInDays={diffInDays} />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <TR069Performance id={selectedOptionCP.id} diffInDays={diffInDays} />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <UAPerformance id={selectedOptionCP.id} diffInDays={diffInDays} />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <DeviceAppTable deviceID={selectedOptionCP.id} />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <DevicePolicyTable deviceID={selectedOptionCP.id} />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <SimpleCard title="Print Report">
              <Button variant="contained" onClick={handlePrint} sx={{ height: '60%' }}>
                Print Report
              </Button>
            </SimpleCard>{' '}
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default Report;
