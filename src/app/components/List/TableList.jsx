import { Grid, ThemeProvider } from '@mui/material';
import tableTheme from 'app/components/Table/TableTheme';
import { MaterialReactTable } from 'material-react-table';

export const TableList = (props) => {
  const { data, density } = props;

  const tableData = data.map((item) => ({
    id: item.id,
    value: item.value,
  }));
  // console.log(data);

  const columns = [
    {
      accessorKey: 'id',
      header: 'Information',
      size: 40,
      enableEditing: false,
      enableFilters: false,
      muiTableHeadCellProps: {
        align: 'left',
      },
      muiTableBodyCellProps: {
        align: 'left',
      },
    },
    {
      accessorKey: 'value',
      header: '',
      size: 40,
      enableEditing: false,
      enableFilters: false,
      muiTableHeadCellProps: {
        align: 'left',
      },
      muiTableBodyCellProps: {
        align: 'left',
      },
    },
  ];
  return (
    <ThemeProvider theme={tableTheme}>
      <MaterialReactTable
        columns={columns}
        data={tableData}
        enableSorting={false}
        enableBottomToolbar={false}
        enableTopToolbar={false}
        enableColumnActions={false}
        enableHiding={false}
        enablePagination={false}
        enableColumnFilterModes={false}
        enableFilters={false}
        enableDensityToggle={false}
        renderBottomToolbarCustomActions={() => <Grid container fullWidth></Grid>}
        initialState={{
          density: density,
        }}
      />
    </ThemeProvider>
  );
};
