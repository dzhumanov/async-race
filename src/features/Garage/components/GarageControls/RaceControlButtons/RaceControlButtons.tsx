import { Button, Grid2 as Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../../../app/hooks.ts';
import {
  driveCar,
  fetchCars,
  switchEngine,
} from '../../../../../app/garage/garageThunks.ts';
import {
  resetCarPosition,
  selectCars,
  turnOffEngine,
} from '../../../../../app/garage/garageSlice.ts';
import { createWinner } from '../../../../../app/winners/winnersThunks.ts';
import { Winner } from '../../../../../types.ts';
// import { updateWinners } from '../../../../../app/winners/winnersSlice.ts';

function formatElapsedTime(ms: number): string {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const milliseconds = ms % 1000;

  return `${minutes > 0 ? `${minutes}m ` : ''}${seconds}s ${milliseconds}ms`;
}

function RaceControlButtons() {
  const dispatch = useAppDispatch();
  const cars = useSelector(selectCars);
  let driveController: AbortController | null = null;

  const startAllEngines = async () => {
    await Promise.all(
      cars.map(async (car) => {
        if (driveController) {
          driveController.abort();
        }
        driveController = new AbortController();
        dispatch(resetCarPosition(car.id));
        await dispatch(switchEngine({ id: car.id, status: 'started' }));
      })
    );

    const drivePromises = cars.map((car) => dispatch(driveCar(car.id)));

    const startTime = Date.now();
    const firstFinishedDrive = await Promise.race(drivePromises);
    const elapsedTime = Date.now() - startTime;
    // dispatch(updateWinners(firstFinishedDrive.payload));
    const winner: Winner = {
      id: firstFinishedDrive.payload.id as string,
      wins: 1,
      time: formatElapsedTime(elapsedTime),
    };
    dispatch(createWinner(winner));

    await Promise.all(drivePromises);
  };

  const resetRace = async () => {
    if (driveController) {
      driveController.abort();
      driveController = null;
    }
    cars.map(async (car) => {
      dispatch(resetCarPosition(car.id));
      dispatch(turnOffEngine(car.id));
      await dispatch(switchEngine({ id: car.id, status: 'stopped' }));
    });
    await dispatch(fetchCars());
  };

  return (
    <Grid container spacing={2}>
      <Button variant="contained" onClick={startAllEngines}>
        Start race
      </Button>
      <Button variant="contained" color="error" onClick={resetRace}>
        Reset race
      </Button>
      <Button variant="contained">Generate cars</Button>
    </Grid>
  );
}

export default RaceControlButtons;
