import { useEffect } from 'react';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import {
  selectDisplayedWinners,
  selectWinners,
} from '../../app/winners/winnersSlice.ts';
import { useAppDispatch } from '../../app/hooks.ts';
import { fetchWinners } from '../../app/winners/winnersThunks.ts';
import FirstTableRow from './components/FirstTableRow/FirstTableRow.tsx';
import WinnersItem from './components/WinnersItem.tsx';
import WinnersPagination from './components/Pagination/WinnersPagination.tsx';

function Winners() {
  const dispatch = useAppDispatch();
  const winners = useSelector(selectWinners);
  const displayedWinners = useSelector(selectDisplayedWinners);

  useEffect(() => {
    if (!winners) {
      dispatch(fetchWinners());
    }
  }, [dispatch, winners]);

  return (
    <div>
      <Typography variant="h3">Winners:</Typography>
      <FirstTableRow />
      {displayedWinners.map((winner) => (
        <WinnersItem key={winner.id} winner={winner} />
      ))}
      <WinnersPagination />
    </div>
  );
}

export default Winners;
