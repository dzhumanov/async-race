import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { closeModal, selectIsOpen, selectWinner } from 'app/modal/modalSlice';
import { useAppDispatch } from '@hooks';
import { fetchOneCar } from '@garage/garageThunks';
import { useEffect, useState } from 'react';
import { CarMutation } from 'types';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function WinnerModal() {
  const open = useSelector(selectIsOpen);
  const winner = useSelector(selectWinner);
  const dispatch = useAppDispatch();
  const [winnerInfo, setWinnerInfo] = useState<CarMutation>({
    name: '',
    color: '',
    id: '',
  });

  useEffect(() => {
    const fetchCarData = async () => {
      const result = await dispatch(fetchOneCar(winner.id));
      setWinnerInfo(result.payload as CarMutation);
    };

    fetchCarData();
  }, [dispatch, winner.id]);

  const handleClose = () => {
    dispatch(closeModal());
  };

  const portalRoot = document.getElementById('portal-root');

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        container={portalRoot}
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Box component="div">
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                The winner is:
              </Typography>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                {winnerInfo.name}
              </Typography>
            </Box>
            <Box component="div">
              <Typography variant="h6">Time: </Typography>
              <Typography>{winner.time} s.</Typography>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
