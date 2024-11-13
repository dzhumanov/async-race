import { Button } from '@mui/material';

interface Props {
  handleDelete: () => void;
  handleSelect: () => void;
}

function CarControlButtons({ handleDelete, handleSelect }: Props): JSX.Element {
  return (
    <>
      <Button variant="contained" sx={{ width: '100%' }} onClick={handleSelect}>
        Select
      </Button>
      <Button variant="outlined" sx={{ width: '100%' }} onClick={handleDelete}>
        Remove
      </Button>
    </>
  );
}

export default CarControlButtons;
