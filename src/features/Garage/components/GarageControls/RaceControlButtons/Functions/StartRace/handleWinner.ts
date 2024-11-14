import { DriveResult, Winner } from 'types';
import { createWinner, updateWinner } from 'app/winners/winnersThunks.ts';
import { AppDispatch } from 'app/store.ts';
import formatSeconds from '../FormatSeconds.ts';

const handleWinner = async (
  dispatch: AppDispatch,
  firstFinishedDrive: DriveResult,
  winners: Winner[],
  elapsedTime: number
) => {
  const existingWinner = winners.find(
    (winner) => winner.id === firstFinishedDrive.payload.id
  );

  if (existingWinner) {
    const oldTime = existingWinner.time;
    const newTime = formatSeconds(elapsedTime);
    if (newTime < oldTime) {
      await dispatch(
        updateWinner({
          ...existingWinner,
          wins: existingWinner.wins + 1,
          time: newTime,
        })
      );
    } else {
      await dispatch(
        updateWinner({ ...existingWinner, wins: existingWinner.wins + 1 })
      );
    }
  } else {
    const winnerObj: Winner = {
      id: firstFinishedDrive.payload.id as string,
      wins: 1,
      time: formatSeconds(elapsedTime),
    };
    await dispatch(createWinner(winnerObj));
  }
};

export default handleWinner;
