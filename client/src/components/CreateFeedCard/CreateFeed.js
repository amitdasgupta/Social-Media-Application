import styles from '../../stylesheets/components/CreateFeedCard.module.scss';
import { Avatar, Button } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import Picker from 'emoji-picker-react';
import { useState } from 'react';
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
    id: 'postImageId',
  },
  Tag: {
    icon: Loyalty,
    color: 'blue',
    id: 'postTagId',
  },
  Location: {
    icon: PersonPinCircle,
    color: 'green',
    id: 'postLocationId',
  },
  Feelings: {
    icon: EmojiEmotions,
    color: '#cece14',
    id: 'postEmojiId',
  },
};
const inputFieldCache = {};
export default function CreateFeed(props) {
  const [postFormData, setPostFormData] = useState({
    desc: '',
    image: null,
  });
  const { image, desc } = postFormData;
  const handleFormChange = (event) => {
    const { name, files, value } = event.target;
    if (name === 'image') {
      return setPostFormData({ ...postFormData, image: files[0] });
    }
    return setPostFormData({ ...postFormData, [name]: value });
  };
  const giveCreateFeedsOperation = () => {
    return Object.keys(feedOperationsObject).map((name) => {
      const Icon = feedOperationsObject[name].icon;
      const color = feedOperationsObject[name].color;
      const id = feedOperationsObject[name].id;
      const jsx = (
        <label htmlFor={id} key={name} className={styles.labelMain}>
          <div>
            <Button
              startIcon={<Icon style={{ color: color }} />}
              component="span"
              className={styles.button}
            >
              {name}
            </Button>
            {getFeedOperation(name, id)}
          </div>
          {getFeedOperationMessage(name)}
        </label>
      );
      return jsx;
    });
  };

  const getFeedOperation = (type, id) => {
    if (inputFieldCache[id]) return inputFieldCache[id];
    switch (type) {
      case 'Photo or Video':
        return (
          <input
            accept="image/*"
            id={id}
            multiple
            type="file"
            style={{ display: 'none' }}
            name="image"
            onChange={handleFormChange}
          />
        );

      default:
        return null;
    }
  };

  const cancelFeedOperations = (type) => {
    return () => {
      let key;
      switch (type) {
        case 'Photo or Video':
          key = 'image';
          break;
        default:
          return null;
      }
      setPostFormData({ ...postFormData, [key]: null });
    };
  };

  const getFeedOperationMessage = (type, id) => {
    switch (type) {
      case 'Photo or Video':
        return (
          image && (
            <div className={styles.feedButtonMessage}>
              {image.name.length > 20
                ? image.name.slice(0, 17) + '...'
                : image.name}
              <span
                className={styles.cancel}
                onClick={cancelFeedOperations(type)}
              >
                X
              </span>
            </div>
          )
        );

      default:
        return null;
    }
  };

  const handleFormSubmit = async (e) => {
    try {
      console.log('hello');
      const { createPost } = props;
      await createPost(postFormData);
    } catch (error) {
      console.log('error');
    }
  };

  console.log(postFormData);

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
        name="desc"
        value={desc}
        onChange={handleFormChange}
      />
      <div className={styles.bottom}>
        <div className={styles.start}>{giveCreateFeedsOperation()}</div>
        <div className={styles.end}>
          <Button
            variant="contained"
            className={styles.buttonEnd}
            onClick={handleFormSubmit}
          >
            Share
          </Button>
        </div>
      </div>
    </div>
  );
}