import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import GarageItem from './components/GarageItem/GarageItem.tsx';
import { selectCars } from '../../app/garageSlice.ts';
import { useAppDispatch } from '../../app/hooks.ts';
import { fetchCars } from '../../app/garageThunks.ts';

function Garage() {
  const cars = useSelector(selectCars);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  return (
    <div>
      {cars.map((car) => (
        <GarageItem key={car.id} carColor={car.color} name={car.name} />
      ))}
      {/* <GarageItem carColor="blue" name="BMW" />
      <GarageItem carColor="red" name="Mercedes" />
      <GarageItem carColor="black" name="Toyota" /> */}
    </div>
  );
}

export default Garage;
