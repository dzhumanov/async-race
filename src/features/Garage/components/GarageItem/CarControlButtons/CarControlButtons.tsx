import { selectRaceStatus } from '@garage/garageSlice';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';

interface Props {
  handleDelete: () => void;
  handleSelect: () => void;
}

function CarControlButtons({ handleDelete, handleSelect }: Props): JSX.Element {
  const raceStatus = useSelector(selectRaceStatus);

  return (
    <>
      <Button
        variant="contained"
        color="error"
        sx={{ width: '100%', mb: 1 }}
        onClick={handleSelect}
      >
        Select
      </Button>
      <Button
        variant="outlined"
        color="error"
        disabled={raceStatus}
        sx={{ width: '100%' }}
        onClick={handleDelete}
      >
        Remove
      </Button>
    </>
  );
}

export default CarControlButtons;
