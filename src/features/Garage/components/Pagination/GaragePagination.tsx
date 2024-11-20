import {
  selectCars,
  selectGaragePage,
  setGaragePage,
} from '@garage/garageSlice';
import { fetchCars, fetchSomeCars } from '@garage/garageThunks';
import { useAppDispatch } from '@hooks';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import PaginationComponent from 'UI/Pagination/PaginationComponent';

function GaragePagination() {
  const dispatch = useAppDispatch();
  const currentPage = useSelector(selectGaragePage);
  const cars = useSelector(selectCars);

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchSomeCars({ page: currentPage }));
  }, [dispatch, currentPage]);

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setGaragePage(value));
  };

  const countPages = () => {
    return Math.round(cars.length / 7);
  };

  return (
    <PaginationComponent
      count={countPages()}
      page={currentPage}
      onChange={handleChange}
    />
  );
}

export default GaragePagination;
