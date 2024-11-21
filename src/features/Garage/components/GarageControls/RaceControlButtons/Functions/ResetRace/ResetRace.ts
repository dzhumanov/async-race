import { resetCarPosition, stopRace, turnOffEngine } from '@garage/garageSlice';
import { driveCar, fetchSomeCars, switchEngine } from '@garage/garageThunks';
import { AppDispatch } from 'app/store';
import { Car } from 'types';

const resetRace = async (
  cars: Car[],
  dispatch: AppDispatch,
  page: number,
  driveController: AbortController
) => {
  cars.forEach((car) => {
    dispatch(driveCar({ id: car.id, signal: driveController.signal }));
  });

  driveController.abort();
  dispatch(stopRace());

  cars.map(async (car) => {
    dispatch(resetCarPosition(car.id));
    dispatch(turnOffEngine(car.id));
    await dispatch(switchEngine({ id: car.id, status: 'stopped' }));
  });
  await dispatch(fetchSomeCars({ page }));
};

export default resetRace;
