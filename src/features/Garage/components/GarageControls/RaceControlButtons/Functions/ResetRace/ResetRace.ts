import { resetCarPosition, turnOffEngine } from '@garage/garageSlice';
import { fetchCars, switchEngine } from '@garage/garageThunks';
import { AppDispatch } from 'app/store';
import { Car } from 'types';

const resetRace = async (cars: Car[], dispatch: AppDispatch) => {
  let driveController: AbortController | null = new AbortController();

  if (driveController) {
    driveController.abort();
    driveController = null;
  }
  cars.map(async (car) => {
    dispatch(resetCarPosition(car.id));
    dispatch(turnOffEngine(car.id));
    await dispatch(switchEngine({ id: car.id, status: 'stopped' }));
  });
  await dispatch(fetchCars());
};

export default resetRace;
