import { resetCarPosition } from '@garage/garageSlice';
import { switchEngine } from '@garage/garageThunks';
import { AppDispatch } from 'app/store';
import { Car } from 'types';

const startEngines = async (dispatch: AppDispatch, cars: Car[]) => {
  let driveController: AbortController | null = null;

  await Promise.all(
    cars.map(async (car) => {
      if (driveController) {
        driveController.abort();
      }
      driveController = new AbortController();
      dispatch(resetCarPosition(car.id));
      await dispatch(switchEngine({ id: car.id, status: 'started' }));
    })
  );
};

export default startEngines;
