import { Button } from '@mui/material';

interface Props {
  turnOnCarEngine: () => void;
  turnOffEngine: () => void;
  status: boolean;
  engineStatus: boolean;
}

function RaceButtons({
  turnOnCarEngine,
  turnOffEngine,
  status,
  engineStatus,
}: Props): JSX.Element {
  return (
    <>
      <Button
        variant="contained"
        color="error"
        sx={{ width: '100%', mb: 1 }}
        onClick={turnOnCarEngine}
        disabled={status}
      >
        Start
      </Button>
      <Button
        variant="outlined"
        color="error"
        sx={{ width: '100%' }}
        onClick={turnOffEngine}
        disabled={!status && engineStatus}
      >
        Stop
      </Button>
    </>
  );
}

export default RaceButtons;
