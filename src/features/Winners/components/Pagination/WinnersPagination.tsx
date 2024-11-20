import { useAppDispatch } from '@hooks';
import {
  selectWinners,
  selectWinnersPage,
  setWinnersPage,
} from 'app/winners/winnersSlice';
import { fetchDisplayedWinners, fetchWinners } from 'app/winners/winnersThunks';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import PaginationComponent from 'UI/Pagination/PaginationComponent';

function WinnersPagination() {
  const dispatch = useAppDispatch();
  const currentPage = useSelector(selectWinnersPage);
  const winners = useSelector(selectWinners);

  useEffect(() => {
    dispatch(fetchWinners());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchDisplayedWinners({ page: currentPage }));
  }, [dispatch, currentPage]);

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setWinnersPage(value));
  };

  const countPages = () => {
    return Math.round(winners.length / 7);
  };

  return (
    <PaginationComponent
      count={countPages()}
      page={currentPage}
      onChange={handleChange}
    />
  );
}

export default WinnersPagination;
