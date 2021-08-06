import styles from '../../stylesheets/pages/Rightbar.module.scss';

export default function Onlineuser() {
  return (
    <div className={styles.onlineUsers}>
      <div className={styles.item}>
        <div className={styles.onlineIcon}>
          <img
            alt="Jon Doe"
            src="https://avatars.githubusercontent.com/u/25057271?s=400&u=f475d749d61767325c66668e7adf165d5460c135&v=4"
            className={styles.icon}
          />
        </div>
        <div>Jon Snow</div>
        <div className={styles.onlineStatus}></div>
      </div>
    </div>
  );
}
