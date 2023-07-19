import React from 'react';

interface SettingsPanelProps {
  showTerm: boolean;
  showCollection: boolean;
  showProduct: boolean;
  minChars: number;
  setShowTerm: (value: boolean) => void;
  setShowCollection: (value: boolean) => void;
  setShowProduct: (value: boolean) => void;
  setMinChars: (value: number) => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  showTerm,
  showCollection,
  showProduct,
  minChars,
  setShowTerm,
  setShowCollection,
  setShowProduct,
  setMinChars,
}) => {
  return (
    <div className="settings-panel">
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
    </div>
  );
};

export default SettingsPanel;
