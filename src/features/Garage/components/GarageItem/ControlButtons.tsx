import { Button } from '@mui/material';

interface Props {
  switchEngine: () => void;
  turnOffEngine: () => void;
}

function ControlButtons({ switchEngine, turnOffEngine }: Props): JSX.Element {
  return (
    <>
      <Button variant="contained" sx={{ width: '100%' }} onClick={switchEngine}>
        Start
      </Button>
      <Button variant="outlined" sx={{ width: '100%' }} onClick={turnOffEngine}>
        Stop
      </Button>
    </>
  );
}

export default ControlButtons;
