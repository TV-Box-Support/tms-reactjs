import React, { useState, useEffect } from 'react';
import { Box, Card, ThemeProvider, Typography } from '@mui/material';
import { MaterialReactTable } from 'material-react-table';
import BottomBarSetup from './BottomBarSetup';
import TopBarSetup from './TopBarSetup';
import { toast } from 'react-toastify';
import EditCommandModal from '../Modal/EditCommandModal';
import tableTheme from 'app/components/Table/TableTheme';
import { getAPageCommand } from 'app/Services/PolicyServices';
import { convertDateTime } from 'app/components/ConvertTimeDate';
import CommandNotiIDDetail from '../Modal/CommandNotiIDDetail';
const CommandManageTable = () => {
  const [arrPolicy, setArrPolicy] = useState([]);
  const [paramsPage, setParamPage] = useState({
    page: 1,
    limit: 10,
    policyname: null,
  });
  const [totalPage, setTotalPage] = useState();
  const [updateTable, setUpdateTable] = useState(true);
  const [resetTable, setResetTable] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleLoadAPagePolicy = async () => {
    let response = await getAPageCommand(paramsPage);
    // console.log(`Page List: `, response);
    if (response.status === 200) {
      // console.log(`Page List: `, response);
      if (response.data.totalElement === null && searchTerm !== null) {
        toast.error('No elements match');
      }
      let arr = response.data.listResult;
      setArrPolicy(arr);
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
    // console.log('resetTable');
  };
  const handleSearchMode = () => {
    setParamPage({ ...paramsPage, policyname: searchTerm });
    setUpdateTable(true);
  };

  useEffect(() => {
    if (resetTable) {
      setParamPage({ page: 1, limit: 10, policyname: null });
      setResetTable(false);
      setUpdateTable(true);
    } else if (updateTable) {
      handleLoadAPagePolicy();
      setUpdateTable(false);
    }
  }, [resetTable, updateTable]);

  const columns = [
    {
      accessorKey: 'id',
      header: 'ID',
      size: 20,
      enableEditing: false,
      enableFilters: false,
      muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      },
      Cell: (row) => <span>{row.row.original.id}</span>,
    },
    {
      accessorKey: 'command',
      header: 'Command',
      enableEditing: false,
      enableSorting: false,
    },
    {
      accessorKey: 'name',
      header: 'Name',
      enableEditing: false,
      enableSorting: false,
    },
    {
      accessorKey: 'commandNotificationId',
      header: 'Notification',
      enableEditing: false,
      enableSorting: false,
      Cell: (row) => (
        <Box>
          <CommandNotiIDDetail id={row.row.original.commandNotificationId} />
        </Box>
      ),
    },
  ];

  return (
    <Card>
      <ThemeProvider theme={tableTheme}>
        <MaterialReactTable
          columns={columns}
          data={arrPolicy}
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
            columnVisibility: {
              id: false,
            },
            columnOrder: [
              'id',
              'command',
              'name',
              'commandNotificationId',
              'mrt-row-expand',
              'mrt-row-actions',
            ],
          }}
          renderRowActionMenuItems={({ row, table, closeMenu }) => [
            <>
              <Box flexBasis="25%">
                <EditCommandModal row={row} setUpdatetable={setUpdateTable} />
              </Box>
            </>,
          ]}
          displayColumnDefOptions={{ 'mrt-row-actions': { size: 300, header: '' } }}
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
              paramsPageDevices={paramsPage}
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
    </Card>
  );
};

export default CommandManageTable;
