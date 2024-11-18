import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import createInputChangeHandler from 'utils/InputChangeHandler/InputChangeHandler.ts';
import { CarMutation } from 'types';
import { useAppDispatch } from '@hooks';
import { selectCurrentPage, selectUpdateCar } from '@garage/garageSlice.ts';
import { fetchSomeCars, updateCar } from '@garage/garageThunks.ts';
import GarageFormUI from '../GarageForm/UI/GarageFormUI.tsx';

const initialState: CarMutation = {
  name: '',
  color: '#ffffffff',
};

function GarageUpdate() {
  const [state, setState] = useState<CarMutation>(initialState);
  const dispatch = useAppDispatch();
  const car = useSelector(selectUpdateCar);
  const currentPage = useSelector(selectCurrentPage);

  useEffect(() => {
    setState(car || initialState);
  }, [car]);

  const inputChangeHandler = createInputChangeHandler(setState);

  const inputColorHandler = (color: string) => {
    setState((prev) => ({ ...prev, color }));
  };

  const isHex = (color: string) => /^#([0-9A-F]{6}|[0-9A-F]{8})$/i.test(color);

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isHex(state.color)) {
      return;
    }
    await dispatch(updateCar(state));
    await dispatch(fetchSomeCars({ page: currentPage }));
  };

  return (
    <GarageFormUI
      name={state.name}
      color={state.color}
      onChange={inputChangeHandler}
      onColorChange={inputColorHandler}
      onFormSubmit={onFormSubmit}
      status="update"
    />
  );
}

export default GarageUpdate;
