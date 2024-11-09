import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import classes from './GarageItem.module.css';
import Car from '../../../../../UI/Icons/Car/Car.tsx';

interface Props {
  status: boolean;
  name: string;
  velocity: number;
  trackWidth: number;
  transitionDuration: number;
  carColor: string;
}

function RaceTrack({
  status,
  name,
  velocity,
  trackWidth,
  transitionDuration,
  carColor,
}: Props): JSX.Element {
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    if (status) {
      setIsStarted(true);
    }
  }, [status]);
  return (
    <>
      <Box
        component="div"
        className={`${classes.car} ${status ? classes.engineOn : ''}`}
        sx={{
          transform: isStarted
            ? `translateX(${trackWidth}px)`
            : 'translateX(0)',
          transition: isStarted
            ? `transform ${transitionDuration}s linear`
            : 'none',
        }}
      >
        <Car color={carColor} />
      </Box>
      <Typography variant="h3" className={classes.name}>
        {name}
      </Typography>
      <Typography variant="body1" className={classes.name}>
        Speed: {velocity}km/h
      </Typography>
    </>
  );
}

export default RaceTrack;
