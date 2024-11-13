import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CarMutation } from '../../../../../types.ts';
import { useAppDispatch } from '../../../../../app/hooks.ts';
import { fetchCars, updateCar } from '../../../../../app/garageThunks.ts';
import GarageFormUI from '../GarageForm/UI/GarageFormUI.tsx';
import { selectUpdateCar } from '../../../../../app/garageSlice.ts';

const initialState: CarMutation = {
  name: '',
  color: '#ffffffff',
};

function GarageUpdate() {
  const [state, setState] = useState<CarMutation>(initialState);
  const dispatch = useAppDispatch();
  const car = useSelector(selectUpdateCar);

  useEffect(() => {
    if (car) {
      setState(car);
    } else {
      setState(initialState);
    }
  }, [car]);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

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
    await dispatch(fetchCars());
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
