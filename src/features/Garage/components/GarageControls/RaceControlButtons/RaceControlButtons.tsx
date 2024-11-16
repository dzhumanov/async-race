import { Button, Grid2 as Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useAppDispatch } from '@hooks';
import { selectCurrentPage, selectDisplayedCars } from '@garage/garageSlice.ts';
import { selectWinners } from 'app/winners/winnersSlice.ts';
import { fetchWinners } from 'app/winners/winnersThunks.ts';
import StartRace from './Functions/StartRace/StartRace.ts';
import resetRace from './Functions/ResetRace/ResetRace.ts';
import GenerateCars from './Functions/GenerateCars/GenerateCars.ts';

function RaceControlButtons() {
  const dispatch = useAppDispatch();
  const cars = useSelector(selectDisplayedCars);
  const winners = useSelector(selectWinners);
  const currentPage = useSelector(selectCurrentPage);

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
          await resetRace(cars, dispatch, currentPage);
        }}
      >
        Reset race
      </Button>
      <Button
        variant="contained"
        onClick={() => GenerateCars(dispatch, currentPage)}
      >
        Generate cars
      </Button>
    </Grid>
  );
}

export default RaceControlButtons;
