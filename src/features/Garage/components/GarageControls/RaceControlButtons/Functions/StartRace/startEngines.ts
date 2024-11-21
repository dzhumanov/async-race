import { resetCarPosition } from '@garage/garageSlice';
import { switchEngine } from '@garage/garageThunks';
import { AppDispatch } from 'app/store';
import { Car } from 'types';

const startEngines = async (dispatch: AppDispatch, cars: Car[]) => {
  await Promise.all(
    cars.map(async (car) => {
      dispatch(resetCarPosition(car.id));
      await dispatch(switchEngine({ id: car.id, status: 'started' }));
    })
  );
};

export default startEngines;
