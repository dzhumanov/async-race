import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import GarageItem from './components/GarageItem/GarageItem.tsx';
import {
  selectCars,
  selectDisplayedCars,
} from '../../app/garage/garageSlice.ts';
import { useAppDispatch } from '../../app/hooks.ts';
import { fetchCars } from '../../app/garage/garageThunks.ts';
import GarageControls from './components/GarageControls/GarageControls.tsx';
import classes from './Garage.module.css';
import GaragePagination from './components/Pagination/GaragePagination.tsx';

function Garage() {
  const cars = useSelector(selectDisplayedCars);
  const allCars = useSelector(selectCars);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!allCars) {
      dispatch(fetchCars());
    }
  }, [dispatch, allCars]);

  // useEffect(() => {
  //   console.log(cars);
  //   console.log(allCars);
  // }, [cars, allCars]);

  return (
    <Box sx={{ mt: 2 }}>
      <GarageControls />
      <Box
        component="div"
        id="garageItemContainer"
        className={cars.length > 0 ? classes.garage : ''}
      >
        {cars.length === 0 && (
          <Typography variant="h5" sx={{ textAlign: 'center' }}>
            Garage is empty
          </Typography>
        )}
        {cars.map((car) => (
          <GarageItem
            key={car.id}
            id={car.id}
            name={car.name}
            carColor={car.color}
            velocity={car.velocity || 0}
            status={car.status}
            engine={car.engine}
          />
        ))}
      </Box>
      <GaragePagination />
    </Box>
  );
}

export default Garage;
