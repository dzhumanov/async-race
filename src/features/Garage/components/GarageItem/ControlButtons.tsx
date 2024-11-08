import { Button } from '@mui/material';

interface Props {
  switchEngine: () => void;
}

function ControlButtons({ switchEngine }: Props): JSX.Element {
  return (
    <>
      <Button variant="contained" sx={{ width: '100%' }} onClick={switchEngine}>
        Start
      </Button>
      <Button variant="outlined" sx={{ width: '100%' }}>
        Stop
      </Button>
    </>
  );
}

export default ControlButtons;
