import React from 'react';
import { styled } from 'styled-components';

type SettingsPanelProps = {
  showTerm: boolean;
  showCollection: boolean;
  showProduct: boolean;
  minChars: number;
  setShowTerm: (value: boolean) => void;
  setShowCollection: (value: boolean) => void;
  setShowProduct: (value: boolean) => void;
  setMinChars: (value: number) => void;
}

const SettingPanelStyled = styled.div`
  width: 400px;
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
      <div>
        <label htmlFor="showTerm">Show Term</label>
        <input
          type="checkbox"
          id="showTerm"
          checked={showTerm}
          onChange={() => setShowTerm(!showTerm)}
        />
      </div>
      <div>
        <label htmlFor="showCollection">Show Collection</label>
        <input
          type="checkbox"
          id="showCollection"
          checked={showCollection}
          onChange={() => setShowCollection(!showCollection)}
        />
      </div>
      <div>
        <label htmlFor="showProduct">Show Product</label>
        <input
          type="checkbox"
          id="showProduct"
          checked={showProduct}
          onChange={() => setShowProduct(!showProduct)}
        />
      </div>
      <div>
        <label htmlFor="minChars">Minimum Characters for Suggestions</label>
        <input
          type="number"
          id="minChars"
          value={minChars}
          onChange={(e) => setMinChars(Number(e.target.value))}
        />
      </div>
    </SettingPanelStyled>
  );
};

export default SettingsPanel;
