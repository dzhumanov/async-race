import { Button, Grid2 as Grid, Typography } from '@mui/material';
import Car from '../../../../../UI/Icons/Car/Car.tsx';
import classes from './GarageItem.module.css';

interface Props {
  carColor: string;
  name: string;
}

function GarageItemUI({ carColor, name }: Props): JSX.Element {
  return (
    <Grid container sx={{ my: 2 }}>
      <Grid container id="controlPanel" size={3} spacing={2}>
        <Grid size={4}>
          <Button variant="contained" sx={{ width: '100%' }}>
            Select
          </Button>
          <Button variant="outlined" sx={{ width: '100%' }}>
            Remove
          </Button>
        </Grid>
        <Grid size={4}>
          <Button variant="contained" sx={{ width: '100%' }}>
            Start
          </Button>
          <Button variant="outlined" sx={{ width: '100%' }}>
            Stop
          </Button>
        </Grid>
        <Grid size={4}>
          <Car color={carColor} />
        </Grid>
      </Grid>
      <Grid size={9} id="raceTrack" className={classes.raceTrack}>
        <Typography variant="h3" className={classes.name}>
          {name}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default GarageItemUI;
