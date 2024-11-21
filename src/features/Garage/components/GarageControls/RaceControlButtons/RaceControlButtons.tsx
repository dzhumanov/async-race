import { Button, Grid2 as Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useAppDispatch } from '@hooks';
import {
  selectDisplayedCars,
  selectGaragePage,
  selectRaceStatus,
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

  useEffect(() => {
    dispatch(fetchWinners());
  }, [dispatch]);

  return (
    <Grid container spacing={2} sx={{ mb: 'auto' }}>
      <Grid size={6}>
        <Button
          variant="contained"
          color="error"
          disabled={raceStatus}
          onClick={async () => {
            await StartRace(dispatch, cars, winners);
          }}
          sx={{ width: '100%' }}
        >
          Start
        </Button>
      </Grid>
      <Grid size={6}>
        <Button
          variant="outlined"
          color="error"
          onClick={async () => {
            await resetRace(cars, dispatch, currentPage);
          }}
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
