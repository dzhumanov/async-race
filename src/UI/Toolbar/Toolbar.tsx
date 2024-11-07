import { NavLink } from 'react-router-dom';
import { AppBar, Grid2, styled, Toolbar, Typography } from '@mui/material';

const Link = styled(NavLink)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit',
  },
});

function AppToolbar() {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Grid2
          container
          justifyContent="space-between"
          alignItems="center"
          sx={{ width: '100%' }}
        >
          <Grid2>
            <Typography
              variant="h3"
              component="div"
              sx={{ textAlign: 'center', color: '#E9E9F2' }}
            >
              <Link to="/">Formula 1</Link>
            </Typography>
          </Grid2>
          <Grid2 container spacing={2}>
            <Link to="/">Garage</Link>
            <Link to="/winners">Winners</Link>
          </Grid2>
        </Grid2>
      </Toolbar>
    </AppBar>
  );
}

export default AppToolbar;
