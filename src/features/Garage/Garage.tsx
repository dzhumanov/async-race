import GarageItem from './components/GarageItem/GarageItem.tsx';

function Garage() {
  return (
    <div>
      <GarageItem carColor="blue" name="BMW" />
      <GarageItem carColor="red" name="Mercedes" />
      <GarageItem carColor="black" name="Toyota" />
    </div>
  );
}

export default Garage;
