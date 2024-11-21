import { NavLink } from 'react-router-dom';
import {
  AppBar,
  Box,
  Container,
  Grid2,
  styled,
  Toolbar,
  Typography,
} from '@mui/material';
import Banner from '../../assets/images/Banner.jpg';

const Link = styled(NavLink)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit',
  },
});

const textStyles = {
  textShadow: 'rgba(238,0,0,0.9) 0px 0px 22px',
  transition: 'all 0.3s ease',
  '&:hover': {
    textShadow: 'rgba(255,255,255,0.9) 0px 0px 22px;',
    color: '#ee0000',
  },
};

function AppToolbar() {
  return (
    <AppBar position="sticky" sx={{ bgcolor: '#26252a' }}>
      <Container maxWidth="lg">
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
              <Link to="/" sx={{ ml: 3 }}>
                <Typography variant="h4" sx={textStyles}>
                  Garage
                </Typography>
              </Link>
              <Link to="/winners" sx={{ ml: 3 }}>
                <Typography variant="h4" sx={textStyles}>
                  Winners
                </Typography>
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
      </Container>
    </AppBar>
  );
}

export default AppToolbar;
