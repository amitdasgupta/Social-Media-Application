import styles from '../../stylesheets/pages/Rightbar.module.scss';
import Notifications from '../../components/Notifications.js';
import Onlineuser from '../../components/OnlineUser';

function Rightbar() {
  return (
    <div className={styles.rightBarMain}>
      <div className={styles.content}>
        <div className={styles.heading}>Notifications</div>
        <Notifications />
        <div className={styles.heading}>Online Users</div>
        <Onlineuser />
      </div>
    </div>
  );
}

export default Rightbar;
