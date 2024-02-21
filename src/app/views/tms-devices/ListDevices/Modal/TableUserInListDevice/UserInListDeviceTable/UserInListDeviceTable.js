import React, { useState, useEffect } from 'react';
import { Card, ThemeProvider, Typography } from '@mui/material';
import { MaterialReactTable } from 'material-react-table';
import { columns } from './ColumnSetup';
import tableTheme from 'app/components/Table/TableTheme';
import BottomBarSetup from './BottomBarSetup';
import TopBarSetup from './TopBarSetup';
import { getUsersInListDevices } from 'app/Services/DevicesServices';

const UserInListDeviceTable = (props) => {
  const { id, addSuccess, setAddSuccess } = props;
  const [arrApps, setArrApps] = useState([]);
  const [paramsPage, setParamPage] = useState({
    page: 1,
    limit: 5,
    id: id,
    search: null,
  });
  const [updateTable, setUpdateTable] = useState(true);
  const [resetTable, setResetTable] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalPage, setTotalPage] = useState();
  const handleLoadAPageDevice = async () => {
    let response = await getUsersInListDevices(paramsPage);
    // console.log(response);
    if (response.status === 200) {
      let arr = response.data.listResult;
      setArrApps(arr);
      setTotalPage(response.data.totalPage);
    }
  };
  const handleMoveToNextPage = () => {
    if (paramsPage.page < totalPage) {
      setParamPage({ limit: paramsPage.limit, page: paramsPage.page + 1 });
      setUpdateTable(true);
    }
  };
  const handleMoveToPrePage = () => {
    if (paramsPage.page > 1) {
      setParamPage({ limit: paramsPage.limit, page: paramsPage.page - 1 });
      setUpdateTable(true);
    }
  };

  const handleResetTable = () => {
    setResetTable(true);
    setSearchTerm('');
  };
  const handleSearchMode = () => {
    setParamPage({
      ...paramsPage,
      search: searchTerm,
    });
    setUpdateTable(true);
  };
  useEffect(() => {
    if (updateTable) {
      handleLoadAPageDevice();
      if (addSuccess) {
        setAddSuccess(false);
      }
      setUpdateTable(false);
    }
    if (addSuccess) {
      setUpdateTable(true);
    }
    if (resetTable) {
      setParamPage({
        page: 1,
        limit: 5,
        id: id,
        search: null,
      });
      setResetTable(false);
      setUpdateTable(true);
    }
  }, [updateTable, addSuccess, resetTable]);

  return (
    <ThemeProvider theme={tableTheme}>
      <MaterialReactTable
        columns={columns}
        data={arrApps}
        options={{ actionsColumnIndex: -1 }}
        enableExpanding
        enableGlobalFilter={false}
        enableColumnFilters={false}
        enableColumnActions={false}
        enablePagination={false}
        enableSorting={false}
        muiTableBodyRowProps={{ hover: false }}
        defaultColumn={{
          maxSize: 120,
          minSize: 10,
          size: 100, //default size is usually 180
        }}
        initialState={{
          density: 'compact',
          columnVisibility: {
            id: false,
          },
          columnOrder: [
            'id',
            'role-state',
            'name',
            'username',
            'email',
            'company',
            'contact',
            'mrt-row-actions',
          ],
        }}
        renderBottomToolbarCustomActions={() => (
          <BottomBarSetup
            paramsPage={paramsPage}
            totalPage={totalPage}
            handleMoveToPrePage={handleMoveToPrePage}
            handleMoveToNextPage={handleMoveToNextPage}
          />
        )}
        renderTopToolbarCustomActions={() => (
          <TopBarSetup
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setResettable={setResetTable}
            handleSearchMode={handleSearchMode}
            handleResetTable={handleResetTable}
          />
        )}
      />
    </ThemeProvider>
  );
};

export default UserInListDeviceTable;
