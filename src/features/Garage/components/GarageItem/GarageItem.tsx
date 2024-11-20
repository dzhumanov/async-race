import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import {
  resetCarPosition,
  selectGaragePage,
  turnOffEngine,
  updateCarState,
} from '@garage/garageSlice.ts';
import {
  deleteCar,
  driveCar,
  fetchSomeCars,
  switchEngine,
} from '@garage/garageThunks.ts';
import { useAppDispatch } from '@hooks';
import { deleteWinner } from 'app/winners/winnersThunks.ts';
import GarageItemUI from './UI/GarageItemUI.tsx';

interface Props {
  id: string;
  name: string;
  carColor: string;
  velocity: number;
  status: boolean;
  engine: boolean;
}

function GarageItem({
  id,
  carColor,
  name,
  velocity = 0,
  status,
  engine,
}: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const [transitionDuration, setTransitionDuration] = useState<number>(0);
  const raceTrackRef = useRef<HTMLDivElement>(null);
  let driveController: AbortController | null = null;
  const currentPage = useSelector(selectGaragePage);
  const trackWidth = raceTrackRef?.current?.clientWidth;

  useEffect(() => {
    if (velocity > 0) {
      setTransitionDuration(500000 / velocity / 1000);
    }
  }, [velocity]);

  const turnOnCarEngine = async () => {
    if (driveController) {
      driveController.abort();
    }
    driveController = new AbortController();
    dispatch(resetCarPosition(id));
    await dispatch(switchEngine({ id, status: 'started' }));
    await dispatch(driveCar(id));
  };

  const turnOffCarEngine = async () => {
    if (driveController) {
      driveController.abort();
      driveController = null;
    }
    dispatch(resetCarPosition(id));
    dispatch(turnOffEngine(id));
    await dispatch(switchEngine({ id, status: 'stopped' }));
  };

  const handleDelete = async () => {
    await dispatch(deleteCar(id));
    await dispatch(deleteWinner(id));
    await dispatch(fetchSomeCars({ page: currentPage }));
  };

  const handleSelect = () => {
    dispatch(updateCarState({ id, name, color: carColor }));
  };

  return (
    <GarageItemUI
      ref={raceTrackRef}
      carColor={carColor}
      name={name}
      turnOnCarEngine={turnOnCarEngine}
      turnOffEngine={turnOffCarEngine}
      handleDelete={handleDelete}
      handleSelect={handleSelect}
      velocity={velocity}
      status={status}
      engine={engine}
      trackWidth={trackWidth || 0}
      transitionDuration={transitionDuration}
    />
  );
}

export default GarageItem;
