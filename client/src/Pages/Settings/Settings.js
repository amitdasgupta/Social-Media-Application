import { Avatar, Button, TextField, Select, MenuItem } from '@material-ui/core';
import { useEffect, useState } from 'react';
import styles from '../../stylesheets/pages/Settings.module.scss';
import Skeleton from 'react-loading-skeleton';

export default function Settings(props) {
  const {
    isAllUserDataFetched,
    getLoggedInUserData,
    userData,
    isUserUpdating,
  } = props;
  const [userProfile, setUserProfile] = useState({});
  useEffect(() => {
    if (!isAllUserDataFetched) {
      getLoggedInUserData();
    }
    if (isAllUserDataFetched) {
      setUserProfile({
        coverPicture: userData.coverPicture,
        username: userData.username,
        gender: userData.gender,
        email: userData.email,
        profilepic: userData.profilepic,
        country: userData.country || 'India',
        city: userData.city || 'Delhi',
        imageFiles: {},
      });
    }
  }, [isAllUserDataFetched, getLoggedInUserData, setUserProfile]);
  const handleFormChange = (event) => {
    const { name, files, value, type } = event.target;
    if (type === 'file') {
      const file = files[0];
      const fileReader = new FileReader();
      const { imageFiles } = userProfile;
      if (file) {
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          setUserProfile({
            ...userProfile,
            [name]: fileReader.result,
            imageFiles: { ...imageFiles, [name]: file },
          });
        };
      }
    } else setUserProfile({ ...userProfile, [name]: value });
  };

  const handleFormSubmit = () => {
    const {
      updateUser,
      userData: { _id },
    } = props;

    const { imageFiles, ...restData } = userProfile;
    const fileData = [];
    for (const fileName in imageFiles) {
      fileData.push(imageFiles[fileName]);
      if (restData[fileName]) restData[fileName] = imageFiles[fileName];
    }
    updateUser({ ...restData, id: _id });
  };

  const {
    coverPicture,
    profilepic,
    username,
    gender = 'male',
    email,
    city,
    country,
  } = userProfile;
  return isAllUserDataFetched && !isUserUpdating ? (
    <>
      <label
        className={styles.coverPicture}
        style={{
          backgroundImage: `url(${coverPicture})`,
          backgroundSize: 'cover',
        }}
        htmlFor="coverPicture"
      >
        {!coverPicture && (
          <p className={styles.notCoverPicturemsg}>
            Add your cover picture here
          </p>
        )}
        <input
          accept="image/*"
          id="coverPicture"
          multiple
          type="file"
          name="coverPicture"
          style={{ display: 'none' }}
          onChange={handleFormChange}
        />
      </label>
      <div className={styles.container}>
        <div className={styles.mainForm}>
          <div className={styles.mainFormLeft}>
            <label htmlFor="profilePic">
              <Avatar
                alt="Jon Doe"
                src={profilepic}
                className={styles.avatar}
              />
              <input
                accept="image/*"
                id="profilePic"
                multiple
                type="file"
                name="profilepic"
                style={{ display: 'none' }}
                onChange={handleFormChange}
              />
            </label>
          </div>
          <div className={styles.mainFormRight}>
            <TextField
              id="standard-multiline-flexible"
              label="User Name"
              multiline
              maxRows={4}
              className={styles.input}
              variant="standard"
              name="username"
              value={username}
              onChange={handleFormChange}
            />
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={gender}
              onChange={handleFormChange}
              label="Gender"
              className={styles.selectBox}
              name="gender"
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
            <TextField
              id="standard-multiline-flexible"
              label="Email"
              multiline
              maxRows={4}
              className={styles.input}
              variant="standard"
              name="email"
              value={email}
              onChange={handleFormChange}
            />

            <TextField
              id="standard-multiline-flexible"
              label="City"
              multiline
              maxRows={4}
              className={styles.input}
              variant="standard"
              name="city"
              value={city}
              onChange={handleFormChange}
            />
            <TextField
              id="standard-multiline-flexible"
              label="Country"
              multiline
              maxRows={4}
              className={styles.input}
              variant="standard"
              name="country"
              value={country}
              onChange={handleFormChange}
            />
          </div>
        </div>
        <Button className={styles.button} onClick={handleFormSubmit}>
          Update
        </Button>
      </div>
    </>
  ) : (
    <Skeleton height={'98vh'} width={'98vw'} />
  );
}
