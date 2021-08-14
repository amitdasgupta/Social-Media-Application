import { useState } from 'react';
import styles from '../../stylesheets/pages/Auth.module.scss';
import Login from './Login';
import Signup from './Signup';

export default function Auth() {
  const [authPage, setAuthPage] = useState('login');
  const Page = authPage === 'login' ? Login : Signup;
  return (
    <div className={styles.main}>
      <div className={styles.leftBackground}>
        <h1 className={styles.welcome}>Social Connect</h1>
      </div>
      <Page setAuthPage={setAuthPage} />
    </div>
  );
}
