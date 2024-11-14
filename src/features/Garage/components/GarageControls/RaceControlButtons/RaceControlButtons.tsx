import { Button, Grid2 as Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
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
import {
  createWinner,
  fetchWinners,
  updateWinner,
} from '../../../../../app/winners/winnersThunks.ts';
import { Winner } from '../../../../../types.ts';
import { selectWinners } from '../../../../../app/winners/winnersSlice.ts';

function formatSeconds(ms: number): number {
  return parseFloat((ms / 1000).toFixed(1));
}

function RaceControlButtons() {
  const dispatch = useAppDispatch();
  const cars = useSelector(selectCars);
  const winners = useSelector(selectWinners);
  let driveController: AbortController | null = null;

  useEffect(() => {
    dispatch(fetchWinners());
  }, [dispatch]);

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
    const firstFinishedDrive = await Promise.any(
      drivePromises.map(async (promise) => {
        const result = await promise;
        if (result.payload?.success) {
          return result;
        }
        throw new Error('Drive failed');
      })
    );
    console.log(firstFinishedDrive);
    const elapsedTime = Date.now() - startTime;

    const existingWinner = winners.find(
      (winner) => winner.id === firstFinishedDrive.payload.id
    );

    if (existingWinner) {
      const oldTime = existingWinner.time;
      const newTime = formatSeconds(elapsedTime);
      console.log(elapsedTime);
      if (newTime < oldTime) {
        await dispatch(
          updateWinner({
            ...existingWinner,
            wins: existingWinner.wins + 1,
            time: formatSeconds(elapsedTime),
          })
        );
      } else {
        await dispatch(
          updateWinner({ ...existingWinner, wins: existingWinner.wins + 1 })
        );
      }
    } else {
      const winnerObj: Winner = {
        id: firstFinishedDrive.payload.id as string,
        wins: 1,
        time: formatSeconds(elapsedTime),
      };
      await dispatch(createWinner(winnerObj));
    }

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
