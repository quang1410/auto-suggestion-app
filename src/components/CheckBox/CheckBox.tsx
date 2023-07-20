import React, { useId } from 'react';
import styled from 'styled-components';

type TypeCheckbox = 'checkbox' | 'radio';
type Props = {
  type?: TypeCheckbox;
  size?: number;
  checked?: boolean;
  disabled?: boolean;
  name: string;
  value: string;
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>, value: string) => void;
};

const CheckboxStyled = styled.div<{
  type: TypeCheckbox;
  size: number;
  isDisabled: boolean;
}>`
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  label {
    cursor: ${props => (props.isDisabled ? 'not-allowed' : 'pointer')};
    margin-bottom: 0;
    font-weight: normal;
    display: flex;
    gap: 10px;
    span {
      border: 1.5px solid #c2c1c3;
      border-radius: ${props => (props.type === 'checkbox' ? '2px' : '50%')};
      width: ${props => props.size}px;
      height: ${props => props.size}px;
      display: block;
      position: relative;
      margin: auto;
    }
    svg {
      display: none;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  input[type='checkbox'] {
    display: none;
    &:checked + label span {
      background-color: #5561e0;
      border-color: #5561e0;
      svg {
        display: block;
      }
    }
  }
`;

function Checkbox(props: Props) {
  const {
    type = 'checkbox',
    size = 18,
    name,
    value,
    onChange,
    checked,
    disabled = false,
    label = '',
  } = props;
  const idUnique = useId();
  const sizeCheck = Math.ceil(size / 2) + 1;

  const handleChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    if (value === name) {
      return type === 'checkbox' ? onChange?.(e, '') : null;
    }
    return onChange?.(e, name);
  };

  return (
    <CheckboxStyled type={type} size={size} isDisabled={disabled}>
      <input
        type={'checkbox'}
        id={idUnique}
        name={name}
        value={value}
        checked={checked || value === name}
        onChange={handleChangeCheckbox}
        disabled={disabled}
      />
      <label htmlFor={idUnique}>
        <span>
          <CheckOnly width={sizeCheck} height={sizeCheck - 2} />
        </span>
        {label}
      </label>
    </CheckboxStyled>
  );
}

const CheckOnly = ({
  width = 8,
  height = 6,
}: {
  width?: number;
  height?: number;
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 8 6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.5904 0.928574C7.8104 1.15905 7.80191 1.52424 7.57143 1.74425L3.34063 5.78271C3.1177 5.99551 2.76687 5.99551 2.54393 5.7827L0.42857 3.76347C0.198092 3.54347 0.189601 3.17828 0.409606 2.9478C0.62961 2.71732 0.994799 2.70883 1.22528 2.92884L2.94229 4.56782L6.77473 0.909602C7.00521 0.6896 7.37039 0.698093 7.5904 0.928574Z"
      fill="white"
    />
  </svg>
);

export default Checkbox;
