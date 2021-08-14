import {
  FormControl,
  InputAdornment,
  TextField,
  Button,
  FormLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@material-ui/core';
import { Email, VpnKey, Person } from '@material-ui/icons';
import styles from '../../stylesheets/pages/Auth.module.scss';
import cx from 'classnames';

export default function Signup({ setAuthPage }) {
  const authPageChange = (type) => {
    return () => setAuthPage(type);
  };

  return (
    <FormControl className={styles.rightForm}>
      <h1 className={styles.welcome}>Register</h1>
      <TextField
        id="input-with-icon-textfield"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Person />
            </InputAdornment>
          ),
        }}
        placeholder="Enter your name"
        className={styles.inputField}
      />
      <TextField
        id="input-with-icon-textfield"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Email />
            </InputAdornment>
          ),
        }}
        placeholder="Enter your email"
        className={styles.inputField}
      />
      <TextField
        id="input-with-icon-textfield"
        type="password"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <VpnKey />
            </InputAdornment>
          ),
        }}
        placeholder="Enter your password"
        className={styles.inputField}
      />

      <TextField
        id="input-with-icon-textfield"
        type="password"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <VpnKey />
            </InputAdornment>
          ),
        }}
        placeholder="Confirm password"
        className={styles.inputField}
      />
      <div className={styles.radio}>
        <FormLabel component="legend">Gender</FormLabel>
        <RadioGroup aria-label="gender" name="gender1" row>
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
        </RadioGroup>
      </div>

      <div className={styles.bottomButtons}>
        <Button
          variant="contained"
          className={cx(styles.signup, styles.button)}
          //   onClick={authPageChange('signup')}
        >
          Signup
        </Button>
        <Button
          variant="contained"
          className={cx(styles.login, styles.button)}
          onClick={authPageChange('login')}
        >
          Login
        </Button>
      </div>
    </FormControl>
  );
}
