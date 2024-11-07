import GarageItemUI from './UI/GarageItemUI.tsx';

interface Props {
  carColor: string;
  name: string;
}

function GarageItem({ carColor, name }: Props): JSX.Element {
  return <GarageItemUI carColor={carColor} name={name} />;
}

export default GarageItem;
