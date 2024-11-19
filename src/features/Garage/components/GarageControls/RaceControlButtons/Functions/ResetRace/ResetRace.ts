import { resetCarPosition, stopRace, turnOffEngine } from '@garage/garageSlice';
import { fetchSomeCars, switchEngine } from '@garage/garageThunks';
import { AppDispatch } from 'app/store';
import { Car } from 'types';

const resetRace = async (cars: Car[], dispatch: AppDispatch, page: number) => {
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
  dispatch(stopRace());
  await dispatch(fetchSomeCars({ page }));
};

export default resetRace;
