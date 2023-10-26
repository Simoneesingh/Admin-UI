import TextField from '@mui/material/TextField'; 
import './SearchBar.css';

const SearchBar = ( {searchQuery, handleSearch}) => {

  return (
    <div>
      <TextField
        value={searchQuery}
        className="SearchBar"
        size="small"
        fullWidth
        placeholder="Search by name, email or role"
        onChange={handleSearch}
      />
      </div>
  );
};

export default SearchBar;
