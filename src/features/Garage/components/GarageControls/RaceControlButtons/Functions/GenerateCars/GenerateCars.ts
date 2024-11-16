import { CarMutation } from 'types.ts';
// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from '@faker-js/faker';
import { createCar, fetchCars, fetchSomeCars } from '@garage/garageThunks';
import { AppDispatch } from 'app/store';

const GenerateCars = async (dispatch: AppDispatch, page: number) => {
  for (let i = 0; i < 100; i += 1) {
    const car: CarMutation = {
      name: `${faker.vehicle.manufacturer()} ${faker.vehicle.model()}`,
      color: faker.internet.color(),
    };
    dispatch(createCar(car));
  }
  if (page === 1) {
    await dispatch(fetchSomeCars({ page: 1 }));
  }
  await dispatch(fetchCars());
};

export default GenerateCars;
