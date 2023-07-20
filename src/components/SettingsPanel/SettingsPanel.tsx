import React from 'react';
import { styled } from 'styled-components';

import { CheckBox } from '../CheckBox';
import { InputType } from '../InputType';

type SettingsPanelProps = {
  showTerm: boolean;
  showCollection: boolean;
  showProduct: boolean;
  minChars: number;
  setShowTerm: (value: boolean) => void;
  setShowCollection: (value: boolean) => void;
  setShowProduct: (value: boolean) => void;
  setMinChars: (value: string) => void;
};

const SettingPanelStyled = styled.div`
  width: 280px;
  margin: 10px 0;
  background-color: #fff;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  border: 1px solid #ccc;
  padding: 10px;
  margin-top: 20px;

  h3 {
    margin-bottom: 10px;
  }

  div {
    margin-bottom: 10px;
  }
`;

const SettingsPanel = ({
  showTerm,
  showCollection,
  showProduct,
  minChars,
  setShowTerm,
  setShowCollection,
  setShowProduct,
  setMinChars,
}: SettingsPanelProps) => {
  return (
    <SettingPanelStyled className="settings-panel">
      <h3>Settings</h3>
      <CheckBox
        value={showTerm.toString()}
        checked={showTerm}
        onChange={(e: React.ChangeEvent<HTMLInputElement>, value: string) =>
          setShowTerm(!showTerm)
        }
        label={'Show Term'}
        name={'term'}
      />
      <CheckBox
        value={showCollection.toString()}
        checked={showCollection}
        onChange={(e: React.ChangeEvent<HTMLInputElement>, value: string) =>
          setShowCollection(!showCollection)
        }
        label={'Show Collection'}
        name={'show_collection'}
      />
      <CheckBox
        value={showProduct.toString()}
        checked={showProduct}
        onChange={(e: React.ChangeEvent<HTMLInputElement>, value: string) =>
          setShowProduct(!showProduct)
        }
        label={'Show Product'}
        name={'show_product'}
      />
      <InputType
        value={Number(minChars)}
        type="number"
        label="Minimum Characters for Suggestions"
        isIcon={false}
        placeholder=""
        onInputChange={setMinChars}
        width='260px'
      />
    </SettingPanelStyled>
  );
};

export default SettingsPanel;
