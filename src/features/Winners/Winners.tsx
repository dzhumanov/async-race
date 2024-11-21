import { useEffect } from 'react';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectDisplayedWinners } from '../../app/winners/winnersSlice.ts';
import { useAppDispatch } from '../../app/hooks.ts';
import { fetchWinners } from '../../app/winners/winnersThunks.ts';
import FirstTableRow from './components/FirstTableRow/FirstTableRow.tsx';
import WinnersItem from './components/WinnersItem.tsx';
import WinnersPagination from './components/Pagination/WinnersPagination.tsx';

function Winners() {
  const dispatch = useAppDispatch();
  const displayedWinners = useSelector(selectDisplayedWinners);

  useEffect(() => {
    dispatch(fetchWinners());
  }, [dispatch]);

  return (
    <div>
      <Typography variant="h3">Winners:</Typography>
      <FirstTableRow />
      {displayedWinners.length === 0 && (
        <Typography variant="h5" sx={{ textAlign: 'center' }}>
          No winners yet.
        </Typography>
      )}
      {displayedWinners.map((winner) => (
        <WinnersItem key={winner.id} winner={winner} />
      ))}
      <WinnersPagination />
    </div>
  );
}

export default Winners;
