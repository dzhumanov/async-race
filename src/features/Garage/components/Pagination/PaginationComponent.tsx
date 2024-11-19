import {
  selectCars,
  selectCurrentPage,
  setCurrentPage,
} from '@garage/garageSlice';
import { fetchCars, fetchSomeCars } from '@garage/garageThunks';
import { useAppDispatch } from '@hooks';
import { Box } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

function PaginationComponent() {
  const dispatch = useAppDispatch();
  const currentPage = useSelector(selectCurrentPage);
  const cars = useSelector(selectCars);

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchSomeCars({ page: currentPage }));
  }, [dispatch, currentPage]);

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setCurrentPage(value));
  };

  const countPages = () => {
    return Math.round(cars.length / 7);
  };

  return (
    <Box
      component="div"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mt: 2,
      }}
    >
      <Pagination
        count={countPages()}
        page={currentPage}
        onChange={handleChange}
        size="large"
        sx={{
          '.MuiPaginationItem-root': {
            color: '#EE0000',
          },
          '.MuiPaginationItem-root:hover': {
            color: '#FF5555',
          },
          '.Mui-selected': {
            color: '#FFFFFF',
            backgroundColor: '#EE0000',
          },
        }}
      />
    </Box>
  );
}

export default PaginationComponent;
