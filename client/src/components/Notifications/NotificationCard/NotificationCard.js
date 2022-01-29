import styles from '../../../stylesheets/components/Notifications.module.scss';
import { CancelOutlined } from '@material-ui/icons';
import Skeleton from 'react-loading-skeleton';
export default function NotificationsCard(props) {
  const {
    data: { profilePic = null, type, userName } = {},
    isAllUserDataFetched,
  } = props;
  return (
    <div className={styles.notifications}>
      <div className={styles.item}>
        <div className={styles.start}>
          {isAllUserDataFetched && profilePic !== null ? (
            <img alt="Jon Doe" src={profilePic} className={styles.icon} />
          ) : (
            <Skeleton className={styles.icon} />
          )}
          <div>{`${userName} follwed you`}</div>
        </div>
        <CancelOutlined className={styles.cancel} />
      </div>
    </div>
  );
}
