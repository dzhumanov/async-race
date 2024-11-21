import { Grid2 as Grid, Typography } from '@mui/material';
import { CarMutation, Winner } from 'types.ts';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '@hooks';
import { fetchOneCar } from '@garage/garageThunks.ts';
import Car from '@icons/Car/Car';

interface Props {
  winner: Winner;
}

export default function WinnersItem({ winner }: Props) {
  const [car, setCar] = useState<CarMutation>({ name: '', color: '', id: '' });

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const carInfo = await dispatch(fetchOneCar(winner.id)).unwrap();
        setCar(carInfo);
      } catch (error) {
        console.error('Failed to fetch car:', error);
      }
    };

    fetchCar();
  }, [dispatch, winner]);

  return (
    <Grid container size={12} alignItems="center">
      <Grid size={2}>
        <Typography variant="body1">{car.id}</Typography>
      </Grid>
      <Grid size={2}>
        <Car color={car.color} />
      </Grid>
      <Grid size={4}>
        <Typography variant="body1">{car.name}</Typography>
      </Grid>
      <Grid size={2}>
        <Typography variant="body1">{winner.wins}</Typography>
      </Grid>
      <Grid size={2}>
        <Typography variant="body1">{winner.time}</Typography>
      </Grid>
    </Grid>
  );
}
