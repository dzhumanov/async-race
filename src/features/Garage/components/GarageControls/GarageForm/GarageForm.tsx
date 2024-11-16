import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentPage } from '@garage/garageSlice.ts';
import { CarMutation } from '../../../../../types.ts';
import { useAppDispatch } from '../../../../../app/hooks.ts';
import GarageFormUI from './UI/GarageFormUI.tsx';
import {
  createCar,
  fetchSomeCars,
} from '../../../../../app/garage/garageThunks.ts';

function GarageForm() {
  const [state, setState] = useState<CarMutation>({
    name: '',
    color: '#ffffffff',
  });
  const dispatch = useAppDispatch();
  const currentPage = useSelector(selectCurrentPage);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

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
