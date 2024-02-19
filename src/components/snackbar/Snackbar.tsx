import { forwardRef } from 'react';
import MuiAlert, {
  type AlertProps,
  type AlertColor,
} from '@mui/material/Alert';
import MuiSnackbar from '@mui/material/Snackbar';

interface SnackbarProps {
  open: boolean;
  severity: AlertColor;
  message: string;
  handleClose: () => void;
}

const Alert = forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <MuiAlert elevation={6} variant="filled" ref={ref} {...props} />
));

Alert.displayName = 'Alert';

const Snackbar = ({
  open,
  severity,
  message,
  handleClose,
}: SnackbarProps) => (
  <MuiSnackbar
    open={open}
    autoHideDuration={3000}
    onClose={handleClose}
    data-cy="mui-snackbar"
  >
    <Alert onClose={handleClose} severity={severity}>
      {message}
    </Alert>
  </MuiSnackbar>
);

export default Snackbar;
