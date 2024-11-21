import { Grid2 as Grid } from '@mui/material';
import GarageForm from './GarageForm/GarageForm.tsx';
import RaceControlButtons from './RaceControlButtons/RaceControlButtons.tsx';
import GarageUpdate from './GarageUpdate/GarageUpdate.tsx';

function GarageControls() {
  return (
    <Grid container alignItems="center">
      <Grid size={{ xs: 12, lg: 5 }}>
        <GarageForm />
      </Grid>
      <Grid size={{ xs: 12, lg: 5 }}>
        <GarageUpdate />
      </Grid>
      <Grid size={{ xs: 12, lg: 2 }} sx={{ mt: { xs: 2 } }}>
        <RaceControlButtons />
      </Grid>
    </Grid>
  );
}

export default GarageControls;
