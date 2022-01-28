import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    width: '300px',
  },
});

const Alert = React.forwardRef(function Alert(props, ref) {
  const styles = useStyles();
  return (
    <MuiAlert
      elevation={6}
      ref={ref}
      variant="filled"
      {...props}
      className={styles.root}
    />
  );
});

export default function CustomizedSnackbars(props) {
  const { error, success, hideError, hideSuccessMsg } = props;

  const { isOpen, errorMsg } = error;

  const { isOpen: isSuccessOpen, successMsg } = success;

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar
        open={isSuccessOpen}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        onClose={hideSuccessMsg}
        autoHideDuration={4000}
      >
        <Alert
          onClose={hideSuccessMsg}
          severity="success"
          sx={{ width: '100%' }}
        >
          {successMsg}
        </Alert>
      </Snackbar>
      <Snackbar
        open={isOpen}
        onClose={hideError}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        autoHideDuration={4000}
      >
        <Alert onClose={hideError} severity="error" sx={{ width: '100%' }}>
          {errorMsg}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
