import { Grid2 as Grid } from '@mui/material';
import GarageForm from './GarageForm/GarageForm.tsx';
import RaceControlButtons from './RaceControlButtons/RaceControlButtons.tsx';

function GarageControls() {
  return (
    <Grid container>
      <GarageForm />
      <RaceControlButtons />
    </Grid>
  );
}

export default GarageControls;
