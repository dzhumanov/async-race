import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { Box } from '@mui/material';

interface Props {
  engine: boolean;
  onMouseEnter: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave: (event: React.MouseEvent<HTMLElement>) => void;
}

function Warning({ engine, onMouseEnter, onMouseLeave }: Props) {
  return (
    <Box onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <ReportProblemIcon
        sx={{
          display: !engine ? 'block' : 'none',
          position: 'absolute',
          fontSize: '44px',
          top: '18%',
          right: '-70px',
          color: 'orange',
          cursor: 'pointer',
        }}
      />
    </Box>
  );
}

export default Warning;
