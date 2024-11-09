import React from 'react';
import { Button, Grid2 as Grid, TextField } from '@mui/material';
import { MuiColorInput } from 'mui-color-input';

interface Props {
  name: string;
  color: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFormSubmit: (e: React.FormEvent) => void;
  onColorChange: (color: string) => void;
}

function GarageFormUI({
  onFormSubmit,
  name,
  color,
  onChange,
  onColorChange,
}: Props): JSX.Element {
  return (
    <form onSubmit={onFormSubmit}>
      <Grid container spacing={2} alignItems="center" sx={{ width: '500px' }}>
        <Grid size={5}>
          <TextField
            id="name"
            label="Name"
            value={name}
            onChange={onChange}
            name="name"
            required
          />
        </Grid>
        <Grid size={4}>
          <MuiColorInput format="hex8" value={color} onChange={onColorChange} />
        </Grid>
        <Grid size={3}>
          <Button variant="outlined" type="submit">
            Create
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default GarageFormUI;
