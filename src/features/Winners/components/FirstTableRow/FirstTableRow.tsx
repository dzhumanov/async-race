import { useAppDispatch } from '@hooks';
import { Grid2 as Grid, Typography, Button } from '@mui/material';
import { fetchDisplayedWinners } from 'app/winners/winnersThunks';
import { useState } from 'react';

export default function FirstTableRow() {
  const dispatch = useAppDispatch();
  const [sortStates, setSortStates] = useState({
    id: 'asc',
    wins: 'asc',
    time: 'asc',
  });

  const handleSort = (field: keyof typeof sortStates) => {
    const newOrder = sortStates[field] === 'asc' ? 'desc' : 'asc';

    setSortStates((prev) => ({
      ...prev,
      [field]: newOrder,
    }));

    dispatch(
      fetchDisplayedWinners({
        sort: field,
        order: newOrder,
      })
    );
  };

  const styles = {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: 'white',
    fontSize: '16px',
    p: 0,
  };

  return (
    <Grid container size={12} sx={styles} alignItems="center">
      <Grid size={2}>
        <Button variant="text" onClick={() => handleSort('id')} sx={styles}>
          № ({sortStates.id})
        </Button>
      </Grid>
      <Grid size={2}>
        <Typography variant="body1">Car</Typography>
      </Grid>
      <Grid size={4}>
        <Typography variant="body1">Name</Typography>
      </Grid>
      <Grid size={2}>
        <Button variant="text" onClick={() => handleSort('wins')} sx={styles}>
          Wins ({sortStates.wins})
        </Button>
      </Grid>
      <Grid size={2}>
        <Button variant="text" onClick={() => handleSort('time')} sx={styles}>
          Best time (seconds) ({sortStates.time})
        </Button>
      </Grid>
    </Grid>
  );
}
