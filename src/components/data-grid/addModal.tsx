import * as React from 'react';
import { Box, styled } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';
import { useSpring, animated } from '@react-spring/web';
import { Grid, Input, InputLabel, Typography, Checkbox } from '@mui/material';
import { Button } from '@mui/material';
import { IUseObject } from './useAddData';

export default function AddModal<T>({
  open,
  setOpen,
  onSubmit,
  addObject
}: {
  open: any,
  setOpen: any,
  onSubmit: () => void,
  addObject: IUseObject
}) {
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: StyledBackdrop }}
      >
        <Fade in={open}>
          <ModalContent sx={style}>
            <Box component='form' width='100%' onSubmit={e => {
              e.preventDefault();
              onSubmit();
              handleClose();
            }}>
              <Grid display='flex' container gap={3}>
                {
                  addObject.data.map((field) => (
                    <div key={field.field}>
                      <InputLabel>{field.name}</InputLabel>
                      {field.type === 'boolean'
                      ?<Checkbox 
                        color='success'
                        onChange={() => addObject.onChange(field.field, !field.value)}
                        required={field.required}
                      />
                      :<Input
                        required={field.required}
                        onChange={(e) => addObject.onChange(field.field, e.target.value)}
                        value={field.value}
                        type={field.type}
                      />}
                    </div>
                  ))
                }
              </Grid>
            <Grid container display='flex' justifyContent='end' mt={3}>
              <Grid>
                <Button type='submit' color='success' variant='contained' sx={{margin: '0 auto'}}>Добавить</Button>
              </Grid>
            </Grid>
          </Box>
          </ModalContent>
        </Fade>
      </Modal>
    </div>
  );
}

const Backdrop = React.forwardRef<
  HTMLDivElement,
  { children: React.ReactElement; open: boolean }
>((props, ref) => {
  const { open, ...other } = props;
  return <Fade ref={ref} in={open} {...other} />;
});

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

interface FadeProps {
  children: React.ReactElement;
  in?: boolean;
  onClick?: any;
  onEnter?: (node: HTMLElement, isAppearing: boolean) => void;
  onExited?: (node: HTMLElement, isAppearing: boolean) => void;
}

const Fade = React.forwardRef<HTMLDivElement, FadeProps>(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null as any, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null as any, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const style = {
  // position: 'absolute',
  // top: '50%',
  // left: '50%',
  // transform: 'translate(-50%, -50%)',
  width: '100%',
};

const ModalContent = styled(Box)(
  ({ theme }) => `
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: hidden;
  background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#FFF'};
  border-radius: 8px;
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 4px 12px ${
    theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.50)' : 'rgba(0,0,0, 0.20)'
  };
  padding: 1rem;
  color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 500;
  text-align: start;
  position: relative;


  & .modal-title {
    margin: 0;
    line-height: 1.5rem;
    margin-right: 0.5rem;
  }

  & .modal-description {
    margin: 0;
    line-height: 1.5rem;
    font-weight: 400;
    color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
  }
  `,
);