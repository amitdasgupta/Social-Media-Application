import { Avatar, Button, TextField, Select, MenuItem } from '@material-ui/core';
import { useState } from 'react';
import styles from '../../stylesheets/pages/Settings.module.scss';

export default function Settings(props) {
  const [userProfile, setUserProfile] = useState({
    coverPicture:
      'https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832__480.jpg',
    profilepic:
      'https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832__480.jpg',
    username: '',
    gender: 'Male',
    email: '',
    city: '',
    country: '',
  });
  const { coverPicture, profilepic, username, gender, email, city, country } =
    userProfile;
  const handleFormChange = (event) => {
    const { name, files, value, type } = event.target;
    if (type === 'file') {
      const file = files[0];
      const fileReader = new FileReader();
      if (file) {
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          setUserProfile({ ...userProfile, [name]: fileReader.result });
        };
      }
    } else setUserProfile({ ...userProfile, [name]: value });
  };
  console.log(userProfile);
  return (
    <>
      <label
        className={styles.coverPicture}
        style={{
          backgroundImage: `url(${coverPicture})`,
          backgroundSize: 'cover',
        }}
        htmlFor="coverPicture"
      >
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
            <TextField
              id="standard-multiline-flexible"
              label="Gender"
              multiline
              maxRows={4}
              className={styles.input}
              variant="standard"
              name="gender"
              value={gender}
              onChange={handleFormChange}
            />
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
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={gender}
              onChange={handleFormChange}
              label="Gender"
              className={styles.selectBox}
              name="gender"
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>
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
        <Button className={styles.button}>Update</Button>
      </div>
    </>
  );
}
