import { driveCar, switchEngine } from '../../../../app/garageThunks.ts';
import { useAppDispatch } from '../../../../app/hooks.ts';
import GarageItemUI from './UI/GarageItemUI.tsx';

interface Props {
  id: string;
  carColor: string;
  name: string;
}

function GarageItem({ id, carColor, name }: Props): JSX.Element {
  const dispatch = useAppDispatch();

  const switchCarEngine = async () => {
    await dispatch(switchEngine({ id, status: 'started' }));
    console.log('engine started');
    await dispatch(driveCar(id));
    console.log('car is driving');
  };

  return (
    <GarageItemUI
      carColor={carColor}
      name={name}
      switchEngine={switchCarEngine}
    />
  );
}

export default GarageItem;
