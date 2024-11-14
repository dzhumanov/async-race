import { Button, Grid2 as Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useAppDispatch } from '@hooks';
import { selectCars } from '@garage/garageSlice.ts';
import { selectWinners } from 'app/winners/winnersSlice.ts';
import { fetchWinners } from 'app/winners/winnersThunks.ts';
import StartRace from './Functions/StartRace/StartRace.ts';
import resetRace from './Functions/ResetRace/ResetRace.ts';

function RaceControlButtons() {
  const dispatch = useAppDispatch();
  const cars = useSelector(selectCars);
  const winners = useSelector(selectWinners);

  useEffect(() => {
    dispatch(fetchWinners());
  }, [dispatch]);

  return (
    <Grid container spacing={2}>
      <Button
        variant="contained"
        onClick={async () => {
          await StartRace(dispatch, cars, winners);
        }}
      >
        Start race
      </Button>
      <Button
        variant="contained"
        color="error"
        onClick={async () => {
          await resetRace(cars, dispatch);
        }}
      >
        Reset race
      </Button>
      <Button variant="contained">Generate cars</Button>
    </Grid>
  );
}

export default RaceControlButtons;
