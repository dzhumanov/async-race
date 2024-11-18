import { Car, DrivePayload, Winner } from 'types';
import { AppDispatch } from 'app/store.ts';
import { driveCar } from '@garage/garageThunks.ts';
import { openModal, setWinner } from 'app/modal/modalSlice.ts';
import getFirstFinishedDrive from './getFirstFinishedDrive.ts';
import handleWinner from './handleWinner.ts';
import startEngines from './startEngines.ts';

const StartRace = async (
  dispatch: AppDispatch,
  cars: Car[],
  winners: Winner[]
) => {
  await startEngines(dispatch, cars);

  const drivePromises: Promise<{ payload: DrivePayload }>[] = cars.map(
    (car) => dispatch(driveCar(car.id)) as Promise<{ payload: DrivePayload }>
  );

  const startTime = Date.now();

  const firstFinishedDrive = await getFirstFinishedDrive(drivePromises);

  const elapsedTime = Date.now() - startTime;

  await handleWinner(dispatch, firstFinishedDrive, winners, elapsedTime);

  dispatch(setWinner(firstFinishedDrive.payload));
  dispatch(openModal());

  await Promise.all(drivePromises);
};

export default StartRace;
