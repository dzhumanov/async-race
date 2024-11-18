import { useEffect, useState, useRef } from 'react';
import Popover from '@mui/material/Popover';
import { Box, Typography } from '@mui/material';
import { selectRaceStatus } from '@garage/garageSlice.ts';
import { useSelector } from 'react-redux';
import classes from './RaceTrack.module.css';
import Car from '../../../../../UI/Icons/Car/Car.tsx';
import Warning from '../../../../../UI/Icons/Warning/Warning.tsx';

interface Props {
  status: boolean;
  name: string;
  velocity: number;
  trackWidth: number;
  transitionDuration: number;
  carColor: string;
  engine: boolean;
}

function RaceTrack({
  status,
  name,
  velocity,
  trackWidth,
  transitionDuration,
  carColor,
  engine,
}: Props): JSX.Element {
  const [isStarted, setIsStarted] = useState(false);
  const [currentPosition, setCurrentPosition] = useState<number>(0);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [carWidth, setCarWidth] = useState<number>(0);
  const carRef = useRef<HTMLDivElement>(null);
  const raceStatus = useSelector(selectRaceStatus);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  useEffect(() => {
    if (status) {
      setIsStarted(true);
    } else {
      setIsStarted(false);
    }
  }, [status]);

  useEffect(() => {
    if (carRef.current) {
      setCarWidth(carRef.current!.offsetHeight);
    }
  }, [carRef]);

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
    <Box sx={{ width: '100%', height: '100%' }}>
      <Box
        ref={carRef}
        component="div"
        className={`${classes.car}`}
        sx={{
          transform: isStarted
            ? `translateX(${trackWidth - carWidth}px)`
            : `translateX(${currentPosition}px)`,
          transition:
            isStarted && raceStatus
              ? `transform ${transitionDuration}s ease-in-out`
              : 'none',
        }}
      >
        <Car color={carColor} />
        <Warning
          engine={engine}
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h3" className={classes.name}>
          {name}
        </Typography>
        <Typography variant="body1" className={classes.speed}>
          Speed: {velocity}km/h
        </Typography>
      </Box>
      <Popover
        id="mouse-over-popover"
        sx={{ pointerEvents: 'none' }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}>{name}&apos;s engine is broken.</Typography>
      </Popover>
    </Box>
  );
}

export default RaceTrack;
