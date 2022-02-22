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
import Skeleton from 'react-loading-skeleton';
import LocationForm from './LocationForm';

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
    validationError: null,
    location: '',
  });
  const [modalOpen, setModalOpen] = useState(false);
  const { image, desc } = postFormData;
  const handleFormChange = (event) => {
    const { name, files, value } = event.target;
    if (name === 'image') {
      return setPostFormData({ ...postFormData, image: files[0] });
    }
    return setPostFormData({ ...postFormData, [name]: value });
  };
  const setPostMetaData = (type, value) => {
    setPostFormData({ ...postFormData, [type]: value });
  };
  const giveCreateFeedsOperation = () => {
    return Object.keys(feedOperationsObject).map((name) => {
      const Icon = feedOperationsObject[name].icon;
      const color = feedOperationsObject[name].color;
      const id = feedOperationsObject[name].id;
      const jsx = (
        <div className={styles.labelMain} key={name}>
          {' '}
          <label htmlFor={id}>
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
          </label>
          {getFeedOperationMessage(name)}
        </div>
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
      case 'Location':
        return (
          <div>
            <input
              id={id}
              style={{ display: 'none' }}
              onClick={() => setModalOpen(true)}
            />
            <LocationForm
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              setPostMetaData={setPostMetaData}
            />
          </div>
        );

      default:
        return null;
    }
  };

  const cancelFeedOperations = (type) => {
    return (event) => {
      event.stopPropagation();
      let key;
      switch (type) {
        case 'Photo or Video':
          key = 'image';
          break;
        case 'Location':
          key = 'location';
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
      case 'Location':
        return (
          postFormData.location && (
            <div className={styles.feedButtonMessage}>
              {postFormData.location.length > 20
                ? postFormData.location.slice(0, 17) + '...'
                : postFormData.location}
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
    const { desc, image } = postFormData;
    if (desc === '' && !image) {
      setPostFormData({
        ...postFormData,
        validationError:
          'Fill either description or attach image to create post',
      });
      return;
    }
    setPostFormData({
      desc: '',
      image: null,
      validationError: null,
    });
    const { createPost } = props;
    createPost(postFormData);
  };

  const { postBeingCreated, error } = props;
  const { validationError } = postFormData;
  return postBeingCreated ? (
    <Skeleton height={200} />
  ) : (
    <div className={styles.createFeed}>
      <div className={styles.top}>
        <Avatar
          alt="Jon Doe"
          src="https://avatars.githubusercontent.com/u/25057271?s=400&u=f475d749d61767325c66668e7adf165d5460c135&v=4"
          className={styles.icon}
        />
        <div className={styles.placeholder}>What's in your mind?</div>
        {error && <div className={styles.error}>{error}</div>}
        {error && <div className={styles.error}>{error}</div>}
        {validationError && (
          <div className={styles.error}>{validationError}</div>
        )}
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
