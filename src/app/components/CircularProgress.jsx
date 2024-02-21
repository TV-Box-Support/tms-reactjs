import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import { Android } from '@material-ui/icons';

export function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex', flexDirection: 'column' }}>
      <CircularProgress color="success" variant="determinate" size={64} thickness={2} {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          position="relative"
        >
          <Grid item>
            <Android fontSize="medium" style={{ color: 'green' }} />
          </Grid>
          <Grid item style={{ fontSize: '10px' }}>{`${Math.round(props.value)}%`}</Grid>
        </Grid>
      </Box>
    </Box>
  );
}
