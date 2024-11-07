import { Button, Grid2 as Grid, Typography } from '@mui/material';
import { Car } from '../../../../UI/Icons/Car/Car';

interface Props {
  carColor: string;
  name: string;
}

const GarageItem: React.FC<Props> = ({ carColor, name }) => {
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
      <Grid
        size={9}
        id="raceTrack"
        sx={{
          height: 'auto',
          backgroundColor: 'black',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="h3"
          sx={{ textTransform: 'uppercase', color: 'white', ml: 3 }}
        >
          {name}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default GarageItem;
