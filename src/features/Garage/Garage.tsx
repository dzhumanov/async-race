import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Box } from '@mui/material';
import GarageItem from './components/GarageItem/GarageItem.tsx';
import {
  selectCars,
  selectDisplayedCars,
} from '../../app/garage/garageSlice.ts';
import { useAppDispatch } from '../../app/hooks.ts';
import { fetchCars } from '../../app/garage/garageThunks.ts';
import GarageControls from './components/GarageControls/GarageControls.tsx';
import PaginationComponent from './components/Pagination/PaginationComponent.tsx';

function Garage() {
  const cars = useSelector(selectDisplayedCars);
  const allCars = useSelector(selectCars);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  useEffect(() => {
    console.log(cars);
    console.log(allCars);
  }, [cars, allCars]);

  return (
    <Box sx={{ mt: 2 }}>
      <GarageControls />
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
      <PaginationComponent />
    </Box>
  );
}

export default Garage;
