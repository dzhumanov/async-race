import { DriveResult, Winner } from 'types';
import { createWinner, updateWinner } from 'app/winners/winnersThunks.ts';
import { AppDispatch } from 'app/store.ts';
import { openModal, setWinner } from 'app/modal/modalSlice.ts';
import { fetchOneCar } from '@garage/garageThunks.ts';
import formatSeconds from '../FormatSeconds.ts';

// eslint-disable-next-line max-lines-per-function
const handleWinner = async (
  dispatch: AppDispatch,
  firstFinishedDrive: DriveResult,
  winners: Winner[],
  elapsedTime: number,
  raceStatus: boolean
) => {
  if (!raceStatus || !firstFinishedDrive.payload.success) {
    return;
  }

  const existingWinner = winners.find(
    (winner) => winner.id === firstFinishedDrive.payload.id
  );

  let updatedWinner: Winner;

  if (existingWinner) {
    const oldTime = existingWinner.time;
    const newTime = formatSeconds(elapsedTime);
    if (newTime < oldTime) {
      updatedWinner = {
        ...existingWinner,
        wins: existingWinner.wins + 1,
        time: newTime,
      };
    } else {
      updatedWinner = {
        ...existingWinner,
        wins: existingWinner.wins + 1,
      };
    }
    await dispatch(updateWinner(updatedWinner));
  } else {
    updatedWinner = {
      id: firstFinishedDrive.payload.id as string,
      wins: 1,
      time: formatSeconds(elapsedTime),
    };
    await dispatch(createWinner(updatedWinner));
  }

  await dispatch(fetchOneCar(firstFinishedDrive.payload.id));
  dispatch(setWinner(updatedWinner));
  dispatch(openModal());
};

export default handleWinner;
