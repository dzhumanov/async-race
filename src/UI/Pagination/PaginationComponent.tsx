import { Box, Pagination } from '@mui/material';
import React from 'react';

interface Props {
  count: number;
  page: number;
  onChange: (_event: React.ChangeEvent<unknown>, value: number) => void;
}

export default function PaginationComponent({ count, page, onChange }: Props) {
  return (
    <Box
      component="div"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mt: 2,
      }}
    >
      <Pagination
        count={count}
        page={page}
        onChange={onChange}
        size="large"
        sx={{
          '.MuiPaginationItem-root': {
            color: '#EE0000',
          },
          '.MuiPaginationItem-root:hover': {
            color: '#FF5555',
          },
          '.Mui-selected': {
            color: '#FFFFFF',
            backgroundColor: '#EE0000',
          },
        }}
      />
    </Box>
  );
}
