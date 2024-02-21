import React, { useState, useEffect } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { columns } from './ColumnSetup';
import { toast } from 'react-toastify';
import { Card, ThemeProvider, Typography } from '@mui/material';
import tableTheme from 'app/components/Table/TableTheme';
import { getAPageAPK, postMapPolicyApk } from 'app/Services/PolicyServices';
import BottomBarSetup from './BottomBarSetup';
import TopBarSetup from './TopBarSetup';

const APKManageTable = (props) => {
  const { id, handleAddAPKSuccess } = props;
  const [arrAPKS, setArrAPKs] = useState([]);
  const [paramsPageAPK, setParamPageAPK] = useState({
    page: 1,
    limit: 5,
    packagename: '',
    version: '',
  });

  const [totalPage, setTotalPage] = useState();
  const [updateTable, setUpdateTable] = useState(true);
  const [resetTable, setResetTable] = useState(false);
  const [searchTermPackage, setSearchTermPackage] = useState('');
  const [searchTermVersion, setSearchTermVersion] = useState('');
  const [rowSelection, setRowSelection] = useState([]);

  const handleEditPolicyApk = async () => {
    const selectedRows = Object.keys(rowSelection)
      .filter((key) => rowSelection[key])
      .map((key) => parseInt(key));
    if (selectedRows.length === 0) {
      toast.error('There is no APK file selected.');
    } else {
      let res = await postMapPolicyApk(id, selectedRows);
      if (res.status === 200) {
        toast.success('Add apk success');
        handleAddAPKSuccess();
      } else {
        toast.error(res.message);
      }
    }
  };

  const handleLoadAPageApk = async () => {
    let response = await getAPageAPK(paramsPageAPK);
    if (response.status === 200) {
      if (response.data.totalElement === null) {
        if (searchTermPackage !== null || searchTermVersion !== null) {
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
    setSearchTermPackage('');
    setSearchTermVersion('');
  };
  const handleSearchMode = () => {
    setParamPageAPK({
      ...paramsPageAPK,
      packagename: searchTermPackage,
      version: searchTermVersion,
    });
    setUpdateTable(true);
  };

  useEffect(() => {
    if (resetTable) {
      setParamPageAPK({ page: 1, limit: 5, packagename: null, version: null });
      setResetTable(false);
      setUpdateTable(true);
    } else if (updateTable) {
      // console.log('change status');
      handleLoadAPageApk();
      setUpdateTable(false);
    }
  }, [resetTable, updateTable]);

  return (
    <Card>
      <Typography
        variant="h6"
        align="left"
        fontWeight="fontWeightBold"
        fontSize={15}
        sx={{ marginTop: '5px', marginLeft: '10px' }}
      >
        APKs available
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
              handleEditPolicyApk={handleEditPolicyApk}
              searchTermPackage={searchTermPackage}
              setSearchTermPackage={setSearchTermPackage}
              searchTermVersion={searchTermVersion}
              setSearchTermVersion={setSearchTermVersion}
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
export default APKManageTable;
