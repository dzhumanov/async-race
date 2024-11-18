import { Car, DrivePayload, Winner } from 'types';
import { AppDispatch } from 'app/store.ts';
import { driveCar } from '@garage/garageThunks.ts';
import { startRace, stopRace } from '@garage/garageSlice.ts';
import getFirstFinishedDrive from './getFirstFinishedDrive.ts';
import handleWinner from './handleWinner.ts';
import startEngines from './startEngines.ts';

const StartRace = async (
  dispatch: AppDispatch,
  cars: Car[],
  winners: Winner[]
) => {
  await startEngines(dispatch, cars);

  dispatch(startRace());

  const drivePromises: Promise<{ payload: DrivePayload }>[] = cars.map(
    (car) => dispatch(driveCar(car.id)) as Promise<{ payload: DrivePayload }>
  );

  const startTime = Date.now();

  const firstFinishedDrive = await getFirstFinishedDrive(drivePromises);

  const elapsedTime = Date.now() - startTime;

  await handleWinner(dispatch, firstFinishedDrive, winners, elapsedTime);

  await Promise.all(drivePromises);

  dispatch(stopRace());
};

export default StartRace;
