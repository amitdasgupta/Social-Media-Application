import {
  Input,
  InputAdornment,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { Box } from '@material-ui/system';
import styles from '../../stylesheets/components/Search.module.scss';

export default function SearchComponent() {
  return (
    <Box className={styles.main}>
      <FormControl variant="standard" className={styles.search}>
        <InputLabel htmlFor="input-with-icon-adornment">Search here</InputLabel>
        <Input
          id="input-with-icon-adornment"
          startAdornment={
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          }
        />
      </FormControl>
    </Box>
  );
}
