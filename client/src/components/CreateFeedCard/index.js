import styles from '../../stylesheets/components/CreateFeedCard.module.scss';
import { Avatar, Button } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import {
  PhotoLibrary,
  Loyalty,
  PersonPinCircle,
  EmojiEmotions,
} from '@material-ui/icons';

const feedOperationsObject = {
  'Photo or Video': {
    icon: PhotoLibrary,
    color: ' #ffa9b8',
  },
  Tag: {
    icon: Loyalty,
    color: 'blue',
  },
  Location: {
    icon: PersonPinCircle,
    color: 'green',
  },
  Feelings: {
    icon: EmojiEmotions,
    color: '#cece14',
  },
};

export default function CreateFeed() {
  const giveCreateFeedsOperation = () => {
    return Object.keys(feedOperationsObject).map((name) => {
      const Icon = feedOperationsObject[name].icon;
      const color = feedOperationsObject[name].color;
      const jsx = (
        <Button
          className={styles.button}
          startIcon={<Icon style={{ color: color }} />}
          key={name}
        >
          {name}
        </Button>
      );
      return jsx;
    });
  };
  return (
    <div className={styles.createFeed}>
      <div className={styles.top}>
        <Avatar
          alt="Jon Doe"
          src="https://avatars.githubusercontent.com/u/25057271?s=400&u=f475d749d61767325c66668e7adf165d5460c135&v=4"
          className={styles.icon}
        />
        <div className={styles.placeholder}>What's in your mind?</div>
      </div>
      <TextField
        id="standard-multiline-flexible"
        label="Type your post"
        multiline
        maxRows={4}
        className={styles.input}
        variant="standard"
      />
      <div className={styles.bottom}>
        <div className={styles.start}>{giveCreateFeedsOperation()}</div>
        <div className={styles.end}>
          <Button variant="contained" className={styles.buttonEnd}>
            Share
          </Button>
        </div>
      </div>
    </div>
  );
}
