import React from 'react';
import { styled } from 'styled-components';

type SearchBoxProps = {
  onInputChange: (input: string) => void;
}

const SearchBoxStyled = styled.div`
  width: 420px;
	height: 50px;
	background-color: #242628;
	position: relative;
	overflow: hidden;
	transition: all 0.5s ease;
	border-radius: 15px;
  margin: 12px;

  .search-input {
	width: 100%;
	height: 100%;
	border: none;
	box-shadow: none;
	background: transparent;
	color: #fff;
	padding: 20px 100px 20px 35px;
	font-size: 20px;
}

.search-btn {
	color: #242628;
	outline: none;
	border: none;
	width: 50px;
	height: 50px;
	position: absolute;
	right: 0;
	top: 0;
	cursor: pointer;
	font-size: 30px;
}
`;

const SearchBox = (props: SearchBoxProps) => {
  const { onInputChange } = props;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange(event.target.value);
  };

  return (
    <SearchBoxStyled>
      <input className="search-input" type="text" onChange={handleInputChange} placeholder="Type here..." />
      <button className="search-btn">
				<i className="fas fa-search"></i>
			</button>
    </SearchBoxStyled>
  );
};

export default SearchBox;
