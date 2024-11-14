import { DriveResult } from 'types';

const getFirstFinishedDrive = async (
  drivePromises: Promise<DriveResult>[]
): Promise<DriveResult> => {
  try {
    const firstFinished = await Promise.any(
      drivePromises.map(async (promise) => {
        const result = await promise;
        if (result.payload.success) {
          return result;
        }
        throw new Error('Drive failed');
      })
    );
    return firstFinished;
  } catch (error) {
    throw new Error('No successful drive found');
  }
};

export default getFirstFinishedDrive;
