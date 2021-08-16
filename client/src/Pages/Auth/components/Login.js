import {
  FormControl,
  InputAdornment,
  TextField,
  Button,
} from '@material-ui/core';
import { useState } from 'react';
import { Email, VpnKey } from '@material-ui/icons';
import styles from '../../../stylesheets/pages/Auth.module.scss';
import cx from 'classnames';
import FormValidator from '../../../helpers/validator';
import FormRules from '../../../helpers/validator/config/login';
const validator = new FormValidator(FormRules);

export default function Login({ setAuthPage, loginUser }) {
  const authPageChange = (type) => {
    return () => setAuthPage(type);
  };

  const [login, setLogin] = useState({
    email: '',
    password: '',
    validationError: {},
  });
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };
  const handleFormSubmit = (e) => {
    const validation = validator.validate(login);
    setLogin({ ...login, validationError: validation });
    if (validation.isValid) {
      loginUser({
        email,
        password,
      });
    }
  };
  const {
    validationError: {
      email: emailError = {},
      password: passwordError = {},
    } = {},
    email,
    password,
  } = login;

  return (
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
        onChange={handleFormChange}
        type="email"
        name="email"
        error={emailError.isInvalid || false}
        helperText={emailError.message || ''}
        value={email}
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
        onChange={handleFormChange}
        name="password"
        error={passwordError.isInvalid || false}
        helperText={passwordError.message || ''}
        value={password}
      />
      <Button variant="contained" className={styles.bottomMessage}>
        Forgot Password?
      </Button>
      <div className={styles.bottomButtons}>
        <Button
          variant="contained"
          className={cx(styles.login, styles.button)}
          onClick={handleFormSubmit}
        >
          Login
        </Button>
        <Button
          variant="contained"
          className={cx(styles.signup, styles.button)}
          onClick={authPageChange('signup')}
        >
          Signup
        </Button>
      </div>
    </FormControl>
  );
}
