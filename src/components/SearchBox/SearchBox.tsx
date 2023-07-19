import React from 'react';

interface SearchBoxProps {
  onInputChange: (input: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onInputChange }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange(event.target.value);
  };

  return (
    <div className="search-box">
      <input type="text" onChange={handleInputChange} placeholder="Type here..." />
    </div>
  );
};

export default SearchBox;
