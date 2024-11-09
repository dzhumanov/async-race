import { Button } from '@mui/material';

interface Props {
  turnOnCarEngine: () => void;
  turnOffEngine: () => void;
  status: boolean;
}

function ControlButtons({
  turnOnCarEngine,
  turnOffEngine,
  status,
}: Props): JSX.Element {
  return (
    <>
      <Button
        variant="contained"
        sx={{ width: '100%' }}
        onClick={turnOnCarEngine}
        disabled={status}
      >
        Start
      </Button>
      <Button
        variant="outlined"
        sx={{ width: '100%' }}
        onClick={turnOffEngine}
        disabled={!status}
      >
        Stop
      </Button>
    </>
  );
}

export default ControlButtons;
