import React, { useId } from 'react';
import { styled } from 'styled-components';

import { device } from '../../utils/constantly';
import IconSearch from '../widgets/IconSearch';

type InputTypeProps = {
  onInputChange: (input: string) => void;
  label: string;
  placeholder: string;
  type: string;
  isIcon: boolean;
  value?: string | number;
  width?: string;
};

const InputTypeStyled = styled.div<{width?: string}>`
  position: relative;
  transition: all 0.5s ease;

  label {
    display: inline-block;
    cursor: pointer;
    margin-bottom: 10px;
    font-weight: 600;
  }

  .search-input {
    width: 100%;
    height: 100%;
    border: 1px solid #242628;
    box-shadow: none;
    background: transparent;
    padding: 10px 20px;
    font-size: 20px;
    border-radius: 5px;
    outline: none;
  }

  .search-btn {
    position: absolute;
    right: 0;
    top: 50%;
    cursor: pointer;
    font-size: 20px;
    background: transparent;
    transform: translate(-50%, -50%);
    border: none;
  }

  @media ${device.mobileS} { 
    width: 250px;
  }

  @media ${device.tablet} { 
    width: ${(props) => props.width ? props.width : '375px'};
  }
`;

const InputType = (props: InputTypeProps) => {
  const { onInputChange, label, placeholder, type, isIcon, value, width } = props;
  const idUnique = useId();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange(event.target.value);
  };

  return (
    <InputTypeStyled width={width}>
      <label htmlFor={idUnique}>{label}</label>
      <input
        id={idUnique}
        className="search-input"
        type={type}
        onChange={handleInputChange}
        placeholder={placeholder}
        value={value}
      />
      {isIcon && (
        <button className="search-btn">
          <IconSearch />
        </button>
      )}
    </InputTypeStyled>
  );
};

export default InputType;
