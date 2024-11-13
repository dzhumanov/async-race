import { Grid2 as Grid } from '@mui/material';
import GarageForm from './GarageForm/GarageForm.tsx';
import RaceControlButtons from './RaceControlButtons/RaceControlButtons.tsx';
import GarageUpdate from './GarageUpdate/GarageUpdate.tsx';

function GarageControls() {
  return (
    <Grid container>
      <Grid size={5}>
        <GarageForm />
      </Grid>
      <Grid size={5}>
        <GarageUpdate />
      </Grid>
      <Grid size={2}>
        <RaceControlButtons />
      </Grid>
    </Grid>
  );
}

export default GarageControls;
