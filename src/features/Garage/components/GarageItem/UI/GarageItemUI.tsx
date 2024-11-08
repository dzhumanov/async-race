import { forwardRef } from 'react';
import { Box, Button, Grid2 as Grid, Typography } from '@mui/material';
import Car from '../../../../../UI/Icons/Car/Car.tsx';
import classes from './GarageItem.module.css';

interface Props {
  carColor: string;
  name: string;
  switchEngine: () => void;
  velocity: number;
  status: boolean;
  trackWidth: number;
  transitionDuration: number;
}

const GarageItemUI = forwardRef<HTMLDivElement, Props>(function GarageItemUI(
  {
    carColor,
    name,
    switchEngine,
    velocity,
    status,
    trackWidth,
    transitionDuration,
  }: Props,
  ref
) {
  return (
    <Grid container sx={{ my: 2 }}>
      <Grid container id="controlPanel" size={2} spacing={2}>
        <Grid size={5}>
          <Button variant="contained" sx={{ width: '100%' }}>
            Select
          </Button>
          <Button variant="outlined" sx={{ width: '100%' }}>
            Remove
          </Button>
        </Grid>
        <Grid size={5}>
          <Button
            variant="contained"
            sx={{ width: '100%' }}
            onClick={switchEngine}
          >
            Start
          </Button>
          <Button variant="outlined" sx={{ width: '100%' }}>
            Stop
          </Button>
        </Grid>
      </Grid>
      <Grid size={10} ref={ref} id="raceTrack" className={classes.raceTrack}>
        <Box
          component="div"
          className={`${classes.car} ${status ? classes.engineOn : ''}`}
          sx={{
            transform: status ? `translateX(${trackWidth}px)` : 'translateX(0)',
            transition: `transform ${transitionDuration}s linear`,
          }}
        >
          <Car color={carColor} />
        </Box>
        <Typography variant="h3" className={classes.name}>
          {name}
        </Typography>
        <Typography variant="body1" className={classes.name}>
          Speed: {velocity}km/h
        </Typography>
      </Grid>
    </Grid>
  );
});

export default GarageItemUI;
