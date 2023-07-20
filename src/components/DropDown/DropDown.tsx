import React, { useState } from 'react';
import { styled } from 'styled-components';
import IconSetting from '../widgets/IconSetting';
import { device } from '../../utils/constantly';

type Props = {
  children: React.ReactNode;
};

const DropdownStyled = styled.div`
  display: flex;
  width: 50px;
  height: 100%;
  border-radius: 5px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  background-color: white;
  justify-content: center;
  align-items: center;

  .dropdown-header {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px;
    cursor: pointer;
  }

  .dropdown-body {
    position: absolute;
    top: 60%;
    left: -25%;
    display: none;
    z-index: 999;
  }

  .dropdown-body.open {
    display: block;
  }

  .dropdown-item {
    padding: 10px;
  }

  .dropdown-item:hover {
    cursor: pointer;
  }

  .dropdown-item-dot {
    opacity: 0;
    color: #91a5be;
    transition: all 0.2s ease-in-out;
  }

  .dropdown-item-dot.selected {
    opacity: 1;
  }

  @media ${device.mobileS} { 
    .dropdown-body {
    left: unset;
    right: -25%;
    }
  }

  @media ${device.tablet} { 
    .dropdown-body {
      left: -25%;
      right: unset;
    }
  }
`;

const Dropdown = ({ children }: Props) => {
  const [isOpen, setOpen] = useState(false);

  const toggleDropdown = () => setOpen(!isOpen);

  return (
    <DropdownStyled>
      <div className="dropdown-header" onClick={toggleDropdown}>
        <IconSetting />
        <div className={`dropdown-body ${isOpen && 'open'}`}>{children}</div>
      </div>
    </DropdownStyled>
  );
};

export default Dropdown;
