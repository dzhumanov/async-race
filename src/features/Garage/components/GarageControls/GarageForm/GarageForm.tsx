import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import createInputChangeHandler from 'utils/InputChangeHandler/InputChangeHandler.ts';
import { selectGaragePage } from '@garage/garageSlice.ts';
import { CarMutation } from '../../../../../types.ts';
import { useAppDispatch } from '../../../../../app/hooks.ts';
import GarageFormUI from './UI/GarageFormUI.tsx';
import {
  createCar,
  fetchCars,
  fetchSomeCars,
} from '../../../../../app/garage/garageThunks.ts';

function GarageForm() {
  const [state, setState] = useState<CarMutation>({
    name: '',
    color: '#ffffffff',
  });
  const dispatch = useAppDispatch();
  const currentPage = useSelector(selectGaragePage);

  const inputChangeHandler = createInputChangeHandler(setState);

  const inputColorHandler = (color: string) => {
    setState((prev) => ({ ...prev, color }));
  };

  const isHex8 = (color: string) => /^#[0-9A-F]{8}$/i.test(color);

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isHex8(state.color)) {
      return;
    }
    await dispatch(createCar(state));
    await dispatch(fetchCars());
    await dispatch(fetchSomeCars({ page: currentPage }));
  };

  return (
    <GarageFormUI
      name={state.name}
      color={state.color}
      onChange={inputChangeHandler}
      onColorChange={inputColorHandler}
      onFormSubmit={onFormSubmit}
      status="create"
    />
  );
}

export default GarageForm;
