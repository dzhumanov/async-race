import {
  selectCars,
  selectDisplayedCars,
  selectGaragePage,
  setGaragePage,
  setPrevPage,
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
  const displayedCars = useSelector(selectDisplayedCars);
  const numberOfCars: number = 7;

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchSomeCars({ page: currentPage }));
  }, [dispatch, currentPage]);

  useEffect(() => {
    if (displayedCars.length === 0) {
      dispatch(fetchCars());
      dispatch(setPrevPage());
    }
  }, [dispatch, displayedCars.length]);

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setGaragePage(value));
  };

  const countPages = () => {
    return Math.ceil(cars.length / numberOfCars);
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
