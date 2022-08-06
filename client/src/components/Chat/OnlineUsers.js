import styles from '../../stylesheets/components/Chat.module.scss';
import UserItem from './UserItem';

export default function OnlineUsers({ userIds }) {
  return (
    <section className={styles.onlineUsers}>
      <h4>{`Active Now (${userIds.length})`}</h4>
      <div className={styles.onlineUsersList}>
        {userIds.map((userId) => (
          <UserItem key={userId} userId={userId} />
        ))}
      </div>
    </section>
  );
}
