import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Box } from '@mui/material';
import GarageItem from './components/GarageItem/GarageItem.tsx';
import { selectCars } from '../../app/garageSlice.ts';
import { useAppDispatch } from '../../app/hooks.ts';
import { fetchCars } from '../../app/garageThunks.ts';
import GarageForm from './components/GarageForm/GarageForm.tsx';

function Garage() {
  const cars = useSelector(selectCars);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  return (
    <Box sx={{ mt: 2 }}>
      <GarageForm />
      {cars.map((car) => (
        <GarageItem
          key={car.id}
          id={car.id}
          carColor={car.color}
          name={car.name}
          velocity={car.velocity || 0}
        />
      ))}
    </Box>
  );
}

export default Garage;
