import { Box, Container, CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import WinnerModal from 'UI/WinnerModal/WinnerModal.tsx';
import Garage from './features/Garage/Garage.tsx';
import Toolbar from './UI/Toolbar/Toolbar.tsx';
import Winners from './features/Winners/Winners.tsx';
import Break from './assets/images/break.png';

function App() {
  return (
    <>
      <CssBaseline />
      <header>
        <Toolbar />
      </header>
      <main>
        <Box
          component="img"
          src={Break}
          sx={{ width: '100%', height: '30px' }}
        />
        <Container maxWidth="lg">
          <Routes>
            <Route path="/" element={<Garage />} />
            <Route path="/winners" element={<Winners />} />
          </Routes>
        </Container>
      </main>

      <WinnerModal />
    </>
  );
}

export default App;
