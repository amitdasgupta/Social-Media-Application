import styles from '../../stylesheets/pages/Rightbar.module.scss';
import { CancelOutlined } from '@material-ui/icons';
export default function Notifications() {
  return (
    <div className={styles.notifications}>
      <div className={styles.item}>
        <div className={styles.start}>
          <img
            alt="Jon Doe"
            src="https://avatars.githubusercontent.com/u/25057271?s=400&u=f475d749d61767325c66668e7adf165d5460c135&v=4"
            className={styles.icon}
          />
          <div>John Cena follwed you</div>
        </div>
        <CancelOutlined className={styles.cancel} />
      </div>
    </div>
  );
}
