import { forwardRef } from 'react';
import { Button, Grid2 as Grid } from '@mui/material';
import classes from './GarageItem.module.css';
import RaceTrack from './RaceTrack.tsx';
import ControlButtons from '../ControlButtons.tsx';

interface Props {
  carColor: string;
  name: string;
  switchEngine: () => void;
  turnOffEngine: () => void;
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
    turnOffEngine,
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
          <ControlButtons
            switchEngine={switchEngine}
            turnOffEngine={turnOffEngine}
          />
        </Grid>
      </Grid>
      <Grid size={10} ref={ref} id="raceTrack" className={classes.raceTrack}>
        <RaceTrack
          status={status}
          velocity={velocity}
          trackWidth={trackWidth}
          transitionDuration={transitionDuration}
          name={name}
          carColor={carColor}
        />
      </Grid>
    </Grid>
  );
});

export default GarageItemUI;
