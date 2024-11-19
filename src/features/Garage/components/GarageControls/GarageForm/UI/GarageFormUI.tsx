import React from 'react';
import { Button, Grid2 as Grid, TextField } from '@mui/material';
import { MuiColorInput } from 'mui-color-input';

interface Props {
  name: string;
  color: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFormSubmit: (e: React.FormEvent) => void;
  onColorChange: (color: string) => void;
  status: 'create' | 'update';
}

function GarageFormUI({
  onFormSubmit,
  name,
  color,
  onChange,
  onColorChange,
  status,
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
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'white',
                },
                '&:hover fieldset': {
                  borderColor: '#EE0000',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#EE0000',
                },
              },
              '& .MuiFormLabel-root': {
                color: 'white',
              },
              '& .MuiFormLabel-root.Mui-focused': {
                color: '#EE0000',
              },
              '&:hover .MuiFormLabel-root': {
                color: '#EE0000',
              },
            }}
          />
        </Grid>
        <Grid size={3}>
          <MuiColorInput
            format="hex8"
            value={color}
            onChange={onColorChange}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'white',
                },
                '&:hover fieldset': {
                  borderColor: '#EE0000',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#EE0000',
                },
              },
              '& .MuiFormLabel-root': {
                color: 'white',
              },
              '& .MuiFormLabel-root.Mui-focused': {
                color: '#EE0000',
              },
              '&:hover .MuiFormLabel-root': {
                color: '#EE0000',
              },
            }}
          />
        </Grid>
        <Grid size={4}>
          <Button variant="outlined" color="error" type="submit">
            {status === 'create' ? 'Create' : 'Update'}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default GarageFormUI;
