import { Dispatch, SetStateAction } from 'react';

const createInputChangeHandler =
  <T>(setState: Dispatch<SetStateAction<T>>) =>
  (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

export default createInputChangeHandler;
