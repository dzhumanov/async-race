import { NavLink } from 'react-router-dom';
import { AppBar, Box, Grid2, styled, Toolbar } from '@mui/material';
import Banner from '../../assets/images/Banner.jpg';

const Link = styled(NavLink)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit',
  },
});

function AppToolbar() {
  return (
    <AppBar position="sticky" sx={{ bgcolor: '#26252a' }}>
      <Toolbar>
        <Grid2
          container
          alignItems="center"
          justifyContent="center"
          sx={{ width: '100%', mx: 'auto' }}
        >
          <Grid2
            container
            spacing={2}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
            }}
          >
            <Link to="/" sx={{ ml: 'auto' }}>
              Garage
            </Link>
            <Link to="/winners" sx={{ ml: 'auto' }}>
              Winners
            </Link>
          </Grid2>
          <Grid2 sx={{ flexGrow: 1 }}>
            <Link to="/">
              <Box
                component="img"
                src={Banner}
                sx={{
                  mx: 'auto',
                  width: '100%',
                  height: 'auto',
                  maxWidth: '500px',
                }}
              />
            </Link>
          </Grid2>
        </Grid2>
      </Toolbar>
    </AppBar>
  );
}

export default AppToolbar;
