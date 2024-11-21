import { Button, Grid2 as Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { useAppDispatch } from '@hooks';
import {
  selectDisplayedCars,
  selectGaragePage,
  selectRaceStatus,
  startRace,
} from '@garage/garageSlice.ts';
import { selectWinners } from 'app/winners/winnersSlice.ts';
import { fetchWinners } from 'app/winners/winnersThunks.ts';
import StartRace from './Functions/StartRace/StartRace.ts';
import resetRace from './Functions/ResetRace/ResetRace.ts';
import GenerateCars from './Functions/GenerateCars/GenerateCars.ts';

function RaceControlButtons() {
  const dispatch = useAppDispatch();
  const cars = useSelector(selectDisplayedCars);
  const winners = useSelector(selectWinners);
  const currentPage = useSelector(selectGaragePage);
  const raceStatus = useSelector(selectRaceStatus);

  const driveController = useRef(new AbortController());

  useEffect(() => {
    dispatch(fetchWinners());

    return () => {
      driveController.current.abort();
    };
  }, [dispatch]);

  const handleStartRace = async () => {
    driveController.current = new AbortController();
    dispatch(startRace());
    await StartRace(dispatch, cars, winners, driveController.current);
  };

  const handleResetRace = async () => {
    await resetRace(cars, dispatch, currentPage, driveController.current);
  };

  return (
    <Grid container spacing={2} sx={{ mb: 'auto' }}>
      <Grid size={6}>
        <Button
          variant="contained"
          color="error"
          disabled={raceStatus}
          onClick={handleStartRace}
          sx={{ width: '100%' }}
        >
          Start
        </Button>
      </Grid>
      <Grid size={6}>
        <Button
          variant="outlined"
          color="error"
          onClick={handleResetRace}
          sx={{ width: '100%' }}
        >
          Reset
        </Button>
      </Grid>
      <Grid size={12}>
        <Button
          variant="contained"
          color="error"
          onClick={() => GenerateCars(dispatch, currentPage)}
          sx={{ width: '100%' }}
        >
          Generate cars
        </Button>
      </Grid>
    </Grid>
  );
}

export default RaceControlButtons;
