import React, { useState, useEffect } from 'react';
import { Typography, MenuItem as Box, Card } from '@mui/material';
import { MaterialReactTable } from 'material-react-table';
import { columns } from './ColumnSetup';
import { toast } from 'react-toastify';
import { ThemeProvider } from '@mui/material';
import tableTheme from 'app/components/Table/TableTheme';
import DeleteAPKDialog from '../Modal/DeleteAPKDialog';
import { getAPageAPK } from 'app/Services/PolicyServices';
import BottomBarSetup from './BottomBarSetup';
import EditApkModal from '../Modal/EditAPKModal';
import TopBarSetup from './TopBarSetup';
import DownloadAPKDialog from '../Modal/DownloadAPKDialog';
import { convertDateTime } from 'app/components/ConvertTimeDate';

const APKManageTable = () => {
  const [arrAPKS, setArrAPKs] = useState([]);
  const [paramsPageAPK, setParamPageAPK] = useState({
    page: 1,
    limit: 10,
    packagename: '',
    version: '',
  });
  const [totalPage, setTotalPage] = useState();
  const [updateTable, setUpdateTable] = useState(true);
  const [resetTable, setResetTable] = useState(false);
  const [searchTermPackage, setSearchTermPackage] = useState('');
  const [searchTermVersion, setSearchTermVersion] = useState('');

  const handleLoadAPageUser = async () => {
    let response = await getAPageAPK(paramsPageAPK);
    if (response.status === 200) {
      // console.log(`Page List: `, response);
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
    // console.log('resetTable');
  };
  const handleSearchMode = () => {
    setParamPageAPK({
      ...paramsPageAPK,
      packagename: searchTermPackage,
      version: searchTermVersion,
    });
    setUpdateTable(true);
  };

  //Edit user

  useEffect(() => {
    if (resetTable) {
      setParamPageAPK({ page: 1, limit: 10, packagename: null, version: null });
      setResetTable(false);
      setUpdateTable(true);
    } else if (updateTable) {
      handleLoadAPageUser();
      setUpdateTable(false);
    }
  }, [resetTable, updateTable]);

  // useEffect(() => {
  //   console.log(arrUsers);
  // }, [updateTable]);

  return (
    <Card>
      <ThemeProvider theme={tableTheme}>
        <MaterialReactTable
          columns={columns}
          data={arrAPKS}
          options={{ actionsColumnIndex: -1 }}
          enableExpanding
          enableEditing={false}
          enableBottomToolbar={true}
          enableGlobalFilter={false}
          enableColumnFilters={false}
          enableColumnActions={false}
          enablePagination={false}
          enableSorting={false}
          expanded={true}
          muiTableBodyRowProps={{ hover: false }}
          defaultColumn={{
            maxSize: 120,
            minSize: 10,
            size: 100, //default size is usually 180
          }}
          initialState={{
            density: 'comfortable',
            columnVisibility: { md5: false, packagesize: false, id: false },
            columnOrder: [
              'id',
              'packagename',
              'version',
              'apkfileUrl',
              'md5',
              'packagesize',
              'mrt-row-expand',
              'mrt-row-actions',
            ],
          }}
          renderRowActionMenuItems={({ row }) => [
            <>
              <Box flexBasis="25%">
                <DownloadAPKDialog
                  url={row.original.apkfileUrl}
                  filename={row.original.packagename.toString()}
                />
              </Box>
              <Box flexBasis="25%">
                <EditApkModal row={row} setUpdatetable={setUpdateTable} />
              </Box>
              <Box flexBasis="25%">
                <DeleteAPKDialog row={row} setUpdatetable={setUpdateTable} />
              </Box>
            </>,
          ]}
          renderDetailPanel={({ row }) => (
            <Box
              sx={{
                display: 'grid',
                margin: 'auto',
                gridTemplateColumns: '1fr 1fr',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography fontSize={'15px'}>
                Created Date: {convertDateTime(row.original.createdDate)}
              </Typography>
              <Typography fontSize={'15px'}>Created By: {row.original.createdBy}</Typography>
              <Typography fontSize={'15px'}>
                Modified Date: {convertDateTime(row.original.modifiedDate)}
              </Typography>
              <Typography fontSize={'15px'}>Modified By: {row.original.modifiedBy}</Typography>
            </Box>
          )}
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
