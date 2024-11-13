import { forwardRef } from 'react';
import { Grid2 as Grid } from '@mui/material';
import classes from './GarageItem.module.css';
import RaceTrack from './RaceTrack.tsx';
import RaceButtons from '../RaceButtons/RaceButtons.tsx';
import CarControlButtons from '../CarControlButtons/CarControlButtons.tsx';

interface Props {
  carColor: string;
  name: string;
  turnOnCarEngine: () => void;
  turnOffEngine: () => void;
  handleDelete: () => void;
  handleSelect: () => void;
  velocity: number;
  status: boolean;
  engine: boolean;
  trackWidth: number;
  transitionDuration: number;
}

const GarageItemUI = forwardRef<HTMLDivElement, Props>(function GarageItemUI(
  {
    carColor,
    name,
    turnOnCarEngine,
    turnOffEngine,
    handleDelete,
    handleSelect,
    velocity,
    status,
    engine,
    trackWidth,
    transitionDuration,
  }: Props,
  ref
) {
  return (
    <Grid container sx={{ my: 2 }}>
      <Grid container id="controlPanel" size={2} spacing={2}>
        <Grid size={5}>
          <CarControlButtons
            handleDelete={handleDelete}
            handleSelect={handleSelect}
          />
        </Grid>
        <Grid size={5}>
          <RaceButtons
            turnOnCarEngine={turnOnCarEngine}
            turnOffEngine={turnOffEngine}
            status={status}
            engineStatus={engine}
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
          engine={engine}
        />
      </Grid>
    </Grid>
  );
});

export default GarageItemUI;
