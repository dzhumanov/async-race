import { Button, Grid2 as Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../../../app/hooks.ts';
import { driveCar, switchEngine } from '../../../../../app/garageThunks.ts';
import { selectCars } from '../../../../../app/garageSlice.ts';

function RaceControlButtons() {
  const dispatch = useAppDispatch();
  const cars = useSelector(selectCars);

  const startAllEngines = async () => {
    await Promise.all(
      cars.map((car) =>
        dispatch(switchEngine({ id: car.id, status: 'started' }))
      )
    );

    await Promise.all(cars.map((car) => dispatch(driveCar(car.id))));
  };

  return (
    <Grid container spacing={2}>
      <Button variant="contained" onClick={startAllEngines}>
        Start race
      </Button>
      <Button variant="contained" color="error">
        Reset race
      </Button>
      <Button variant="contained">Generate cars</Button>
    </Grid>
  );
}

export default RaceControlButtons;
