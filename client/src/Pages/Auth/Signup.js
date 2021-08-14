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
import { useState } from 'react';
import { Email, VpnKey, Person } from '@material-ui/icons';
import styles from '../../stylesheets/pages/Auth.module.scss';
import cx from 'classnames';
import FormValidator from '../../helpers/validator';
import FormRules from '../../helpers/validator/config/signup';
import { postRequest } from '../../helpers/axios';
const validator = new FormValidator(FormRules);

export default function Signup({ setAuthPage }) {
  const authPageChange = (type) => {
    return () => setAuthPage(type);
  };
  const [signup, setSignup] = useState({
    email: '',
    password: '',
    repassword: '',
    username: '',
    gender: 'male',
    validationError: {},
  });
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setSignup({ ...signup, [name]: value });
  };
  const handleFormSubmit = (e) => {
    const validation = validator.validate(signup);
    setSignup({ ...signup, validationError: validation });
    if (validation.isValid) {
      postRequest('auth/register', {
        username: username,
        email,
        password,
        gender,
      });
    }
  };
  const {
    validationError: {
      email: emailError = {},
      password: passwordError = {},
      repassword: repasswordError = {},
      username: usernameError = {},
    } = {},
    email,
    password,
    repassword,
    username,
    gender,
  } = signup;

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
        onChange={handleFormChange}
        name="username"
        type="text"
        error={usernameError.isInvalid || false}
        helperText={usernameError.message || ''}
        value={username}
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
        onChange={handleFormChange}
        name="repassword"
        error={repasswordError.isInvalid || false}
        helperText={repasswordError.message || ''}
        value={repassword}
      />
      <div className={styles.radio}>
        <FormLabel component="legend">Gender</FormLabel>
        <RadioGroup
          aria-label="gender"
          name="gender"
          row
          onChange={handleFormChange}
          value={gender}
        >
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
        </RadioGroup>
      </div>

      <div className={styles.bottomButtons}>
        <Button
          variant="contained"
          className={cx(styles.signup, styles.button)}
          onClick={handleFormSubmit}
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
