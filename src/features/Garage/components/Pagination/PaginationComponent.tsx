import {
  selectCars,
  selectCurrentPage,
  selectDisplayedCars,
  setCurrentPage,
} from '@garage/garageSlice';
import { fetchSomeCars } from '@garage/garageThunks';
import { useAppDispatch } from '@hooks';
import Pagination from '@mui/material/Pagination';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

function PaginationComponent() {
  const dispatch = useAppDispatch();
  const currentPage = useSelector(selectCurrentPage);
  const cars = useSelector(selectCars);
  const displayedCars = useSelector(selectDisplayedCars);

  useEffect(() => {
    if (displayedCars.length === 0) {
      dispatch(fetchSomeCars({ page: currentPage }));
    }
  }, [dispatch, currentPage, displayedCars]);

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setCurrentPage(value));
  };

  const countPages = () => {
    return Math.round(cars.length / 7);
  };

  return (
    <div>
      <Pagination
        count={countPages()}
        page={currentPage}
        onChange={handleChange}
        size="large"
      />
    </div>
  );
}

export default PaginationComponent;
