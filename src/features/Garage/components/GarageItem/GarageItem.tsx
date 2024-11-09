import { useState, useEffect, useRef } from 'react';
import { driveCar, switchEngine } from '../../../../app/garageThunks.ts';
import { useAppDispatch } from '../../../../app/hooks.ts';
import GarageItemUI from './UI/GarageItemUI.tsx';

interface Props {
  id: string;
  name: string;
  carColor: string;
  velocity: number;
  status: boolean;
}

function GarageItem({
  id,
  carColor,
  name,
  velocity = 0,
  status,
}: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const [trackWidth, setTrackWidth] = useState<number>(0);
  const [transitionDuration, setTransitionDuration] = useState<number>(0);
  const raceTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (raceTrackRef.current) {
      setTrackWidth(raceTrackRef.current.clientWidth);
    }
  }, []);

  useEffect(() => {
    if (velocity > 0) {
      setTransitionDuration(500000 / velocity / 1000);
    }
  }, [velocity]);

  const switchCarEngine = async () => {
    await dispatch(switchEngine({ id, status: 'started' }));
    console.log('engine started');
    await dispatch(driveCar(id));
    console.log('car is driving');
  };

  return (
    <GarageItemUI
      ref={raceTrackRef}
      carColor={carColor}
      name={name}
      switchEngine={switchCarEngine}
      velocity={velocity}
      status={status}
      trackWidth={trackWidth}
      transitionDuration={transitionDuration}
    />
  );
}

export default GarageItem;
