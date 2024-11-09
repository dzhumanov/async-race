import { useEffect, useState, useRef } from 'react';
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
  const [currentPosition, setCurrentPosition] = useState<number>(0);
  const carRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status) {
      setIsStarted(true);
    } else {
      setIsStarted(false);
    }
  }, [status]);

  useEffect(() => {
    if (!status && velocity === 0) {
      setCurrentPosition(0);
    }
  }, [status, velocity]);

  useEffect(() => {
    if (isStarted) {
      const interval = setInterval(() => {
        setCurrentPosition((prevPosition) => prevPosition + velocity);

        if (carRef.current) {
          const { transform } = getComputedStyle(carRef.current);
          const match = transform.match(/matrix.*\((.+)\)/);
          if (match && match[1]) {
            const values = match[1].split(', ');
            const xPosition = parseFloat(values[4]);
            setCurrentPosition(xPosition);
          }
        }
      }, 100);

      return () => clearInterval(interval);
    }
    return () => {};
  }, [isStarted, velocity]);

  return (
    <>
      <Box
        ref={carRef}
        component="div"
        className={`${classes.car} ${status ? classes.engineOn : ''}`}
        sx={{
          transform: isStarted
            ? `translateX(${trackWidth}px)`
            : `translateX(${currentPosition}px)`,
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
