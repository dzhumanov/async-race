import { useEffect } from 'react';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectWinners } from '../../../app/winners/winnersSlice.ts';
import { useAppDispatch } from '../../../app/hooks.ts';
import { fetchWinners } from '../../../app/winners/winnersThunks.ts';

function Winners() {
  const dispatch = useAppDispatch();
  const winners = useSelector(selectWinners);

  useEffect(() => {
    dispatch(fetchWinners());
  }, [dispatch]);

  return (
    <div>
      <Typography variant="h3">Winners are:</Typography>
      {winners.map((winner) => (
        <div key={winner.id}>
          <Typography variant="h4">{winner.time}</Typography>
          <Typography variant="h4">Winner id: {winner.id}</Typography>
          <Typography variant="h4" sx={{ color: 'red' }}>
            Number of wins: {winner.wins}
          </Typography>
        </div>
      ))}
    </div>
  );
}

export default Winners;
