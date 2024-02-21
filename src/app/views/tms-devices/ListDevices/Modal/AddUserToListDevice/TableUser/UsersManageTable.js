import React, { useState, useEffect } from 'react';
import { Box, Card, IconButton, ThemeProvider, Tooltip, Typography } from '@mui/material';
import { MaterialReactTable } from 'material-react-table';
import { columns } from './ColumnSetup';
import { postUsersToListDevices } from 'app/Services/DevicesServices';
import BottomBarSetup from './BottomBarSetup';
import TopBarSetup from './TopBarSetup';
import { toast } from 'react-toastify';
import tableTheme from 'app/components/Table/TableTheme';
import { convertDateTime } from 'app/components/ConvertTimeDate';
import { getAPageUser } from 'app/Services/User_Auth_Service';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

const UserManageTable = (props) => {
  const { id, handleAddUserSuccess } = props;
  const [arrUsers, setArrUsers] = useState([]);
  const [paramsPageUser, setParamPageUser] = useState({
    page: 1,
    limit: 5,
    active: 1,
    search: null,
  });
  const [totalPage, setTotalPage] = useState();
  const [updateTable, setUpdateTable] = useState(true);
  const [resetTable, setResetTable] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [userId, setUserId] = useState(null);

  const handleLoadAPageUser = async () => {
    let response = await getAPageUser(paramsPageUser);
    if (response.status === 200) {
      if (response.data.totalElement === null) {
        if (searchTerm !== null) {
          toast.error('No element matchs');
        } else {
          toast.error('Nothing to show');
        }
      }
      let arr = response.data.listResult;
      setArrUsers(arr);
      setTotalPage(response.data.totalPage);
    }
  };

  const handleEditUserToListDevices = async () => {
    let res = await postUsersToListDevices(id, userId);
    if (res.status === 200) {
      toast.success('Add users success');
      setUserId(null);
      handleAddUserSuccess();
    } else {
      toast.error(res.message);
    }
  };

  const handleMoveToNextPage = () => {
    if (paramsPageUser.page < totalPage) {
      setParamPageUser({ limit: paramsPageUser.limit, page: paramsPageUser.page + 1 });
      setUpdateTable(true);
    }
  };
  const handleMoveToPrePage = () => {
    if (paramsPageUser.page > 1) {
      setParamPageUser({ limit: paramsPageUser.limit, page: paramsPageUser.page - 1 });
      setUpdateTable(true);
    }
  };

  const handleResetTable = () => {
    setResetTable(true);
    setSearchTerm('');
    // console.log('resetTable');
  };
  const handleSearchMode = () => {
    setParamPageUser({ ...paramsPageUser, search: searchTerm });
    setUpdateTable(true);
  };

  //Edit user

  useEffect(() => {
    if (resetTable) {
      setParamPageUser({ page: 1, limit: 5, active: 1, search: null });
      setResetTable(false);
      setUpdateTable(true);
    } else if (updateTable) {
      handleLoadAPageUser();
      setUpdateTable(false);
    }
  }, [resetTable, updateTable]);

  useEffect(() => {
    if (userId !== null) {
      handleEditUserToListDevices();
      console.log(userId);
    }
  }, [userId]);
  return (
    <Card>
      <Typography
        variant="h6"
        align="left"
        fontWeight="fontWeightBold"
        fontSize={15}
        sx={{ marginTop: '5px', marginLeft: '10px' }}
      >
        Users available
      </Typography>
      <ThemeProvider theme={tableTheme}>
        <MaterialReactTable
          columns={columns}
          data={arrUsers}
          options={{ actionsColumnIndex: -1 }}
          enableExpanding
          enableGlobalFilter={false}
          enableColumnFilters={false}
          enableColumnActions={false}
          enablePagination={false}
          enableSorting={false}
          renderRowActions={({ row }) => [
            <Box>
              <Tooltip arrow placement="bottom" title="Add User">
                <div>
                  <IconButton onClick={() => setUserId(row.original.id)}>
                    <PersonAddAltIcon color="primary" />
                  </IconButton>
                </div>
              </Tooltip>
            </Box>,
          ]}
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
              'mrt-row-expand',
            ],
          }}
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
              paramsPageDevices={paramsPageUser}
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

export default UserManageTable;
