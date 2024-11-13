import { Container, CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Garage from './features/Garage/Garage.tsx';
import Toolbar from './UI/Toolbar/Toolbar.tsx';
import Winners from './features/Winners/components/Winners.tsx';

function App() {
  return (
    <>
      <CssBaseline />
      <header>
        <Toolbar />
      </header>
      <main>
        <Container maxWidth="lg">
          <Routes>
            <Route path="/" element={<Garage />} />
            <Route path="/winners" element={<Winners />} />
          </Routes>
        </Container>
      </main>
    </>
  );
}

export default App;
