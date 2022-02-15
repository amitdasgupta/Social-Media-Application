import styles from '../../stylesheets/components/CreateFeedCard.module.scss';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import { useState } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';

export default function LocationForm(props) {
  const { modalOpen, setModalOpen, setPostMetaData } = props;
  const [locationFilter, setLocationFilter] = useState('');
  const handleChange = (address) => {
    setLocationFilter(address);
  };
  const handleSelect = (address) => {
    setLocationFilter(address);
  };

  return (
    <Dialog
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      sx={{
        '.MuiPaper-root': {
          width: '40%',
          minWidth: '300px',
        },
      }}
      className={styles.locationForm}
    >
      <DialogTitle>Add Location</DialogTitle>
      <DialogContent>
        <PlacesAutocomplete
          value={locationFilter}
          onChange={handleChange}
          onSelect={handleSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div>
              <input
                {...getInputProps({
                  placeholder: 'Search Places ...',
                  className: styles.locationSearchInput,
                })}
              />
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion, index) => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                      key={`${suggestion}-${index}`}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setModalOpen(false)}>Cancel</Button>
        <Button
          onClick={() => {
            setPostMetaData('location', locationFilter);
            setModalOpen(false);
          }}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
