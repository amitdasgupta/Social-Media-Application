import {
  FormControl,
  InputAdornment,
  TextField,
  Button,
} from '@material-ui/core';
import { Email, VpnKey } from '@material-ui/icons';
import styles from '../../stylesheets/pages/Login.module.scss';
import cx from 'classnames';

export default function index() {
  return (
    <div className={styles.main}>
      <div className={styles.leftBackground}>
        <h1 className={styles.welcome}>Social Connect</h1>
      </div>
      <FormControl className={styles.rightForm}>
        <h1 className={styles.welcome}>Welcome</h1>
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
        <Button variant="contained" className={styles.bottomMessage}>
          Forgot Password?
        </Button>
        <div className={styles.bottomButtons}>
          <Button
            variant="contained"
            className={cx(styles.login, styles.button)}
          >
            Login
          </Button>
          <Button
            variant="contained"
            className={cx(styles.signup, styles.button)}
          >
            Signup
          </Button>
        </div>
      </FormControl>{' '}
    </div>
  );
}
