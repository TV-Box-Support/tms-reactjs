import React, { useState, useEffect } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { columns } from './ColumnSetup';
import { toast } from 'react-toastify';
import { Card, ThemeProvider, Typography } from '@mui/material';
import tableTheme from 'app/components/Table/TableTheme';
import { postDevicesToListDevices } from 'app/Services/DevicesServices';
import { getAPageDeviceLocation } from 'app/Services/DevicesServices';
import BottomBarSetup from './BottomBarSetup';
import TopBarSetup from './TopBarSetup';

const DeviceLocationMap = (props) => {
  const { id, setAddSuccess } = props;
  const [arrAPKS, setArrAPKs] = useState([]);
  const [paramsPageAPK, setParamPageAPK] = useState({
    page: 1,
    limit: 5,
    location: null,
    description: null,
  });

  const [totalPage, setTotalPage] = useState();
  const [updateTable, setUpdateTable] = useState(false);
  const [resetTable, setResetTable] = useState(false);
  const [searchLoca, setSearchLoca] = useState('');
  const [searchDes, setSearchDes] = useState('');
  const [rowSelection, setRowSelection] = useState([]);

  const handleEditPolicyDevices = async () => {
    const selectedRows = Object.keys(rowSelection)
      .filter((key) => rowSelection[key])
      .map((key) => parseInt(key));
    if (selectedRows.length === 0) {
      toast.error('There is no device selected.');
    } else {
      let res = await postDevicesToListDevices(id, selectedRows);
      console.log(res);
      if (res.status === 200) {
        toast.success('Add device success');
        setAddSuccess(true);
      } else {
        toast.error(res.message);
      }
    }
  };

  const handleLoadAPageDeivice = async () => {
    let response = await getAPageDeviceLocation(paramsPageAPK);
    if (response.status === 200) {
      if (response.data.totalElement === null) {
        if (searchLoca !== null) {
          toast.error('No element matchs');
        } else {
          toast.error('Nothing to show');
        }
      }
      let arr = response.data.listResult;
      setArrAPKs(arr);
      setTotalPage(response.data.totalPage);
    }
  };

  const handleMoveToNextPage = () => {
    if (paramsPageAPK.page < totalPage) {
      setParamPageAPK({ limit: paramsPageAPK.limit, page: paramsPageAPK.page + 1 });
      setUpdateTable(true);
    }
  };
  const handleMoveToPrePage = () => {
    if (paramsPageAPK.page > 1) {
      setParamPageAPK({ limit: paramsPageAPK.limit, page: paramsPageAPK.page - 1 });
      setUpdateTable(true);
    }
  };

  const handleResetTable = () => {
    setResetTable(true);
  };
  const handleSearchMode = () => {
    setParamPageAPK({
      ...paramsPageAPK,
      location: searchLoca,
      description: searchDes,
    });
    setUpdateTable(true);
  };

  useEffect(() => {
    if (resetTable) {
      setSearchLoca('');
      setSearchDes('');
      setArrAPKs([]);
      setTotalPage();
      setResetTable(false);
    } else if (updateTable) {
      handleLoadAPageDeivice();
      setUpdateTable(false);
    }
  }, [resetTable, updateTable]);

  return (
    <Card sx={{ m: 1 }}>
      <Typography
        variant="h6"
        align="left"
        fontWeight="fontWeightBold"
        fontSize={15}
        sx={{ marginTop: '5px', marginLeft: '10px' }}
      >
        Devices available
      </Typography>
      <ThemeProvider theme={tableTheme}>
        <MaterialReactTable
          columns={columns}
          data={arrAPKS}
          initialState={{
            density: 'compact',
            columnVisibility: { packagesize: false, id: false },
          }}
          enableRowSelection
          enableGlobalFilter={false}
          enableColumnFilters={false}
          enableColumnActions={false}
          enablePagination={false}
          enableSorting={false}
          enableSelectAll={false}
          positionToolbarAlertBanner={'none'}
          getRowId={(row) => row.id}
          onRowSelectionChange={(selectedRows) => setRowSelection(selectedRows)}
          state={{ rowSelection }}
          muiTableBodyRowProps={{ hover: false }}
          defaultColumn={{
            maxSize: 120,
            minSize: 10,
            size: 100, //default size is usually 180
          }}
          renderBottomToolbarCustomActions={() => (
            <BottomBarSetup
              paramsPageUser={paramsPageAPK}
              totalPage={totalPage}
              handleMoveToPrePage={handleMoveToPrePage}
              handleMoveToNextPage={handleMoveToNextPage}
            />
          )}
          renderTopToolbarCustomActions={() => (
            <TopBarSetup
              handleEditPolicyDevice={handleEditPolicyDevices}
              searchLoca={searchLoca}
              searchDes={searchDes}
              setSearchLoca={setSearchLoca}
              setSearchDes={setSearchDes}
              setResettable={setResetTable}
              handleSearchMode={handleSearchMode}
              handleResetTable={handleResetTable}
            />
          )}
        />
      </ThemeProvider>
    </Card>
  );
};
export default DeviceLocationMap;
