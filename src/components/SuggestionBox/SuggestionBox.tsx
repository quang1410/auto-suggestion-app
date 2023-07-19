import axios from 'axios';
import React, { useState } from 'react';

import { SearchBox } from '../SearchBox';
import { ResultBlock } from '../ResultBlock';
import { SettingsPanel } from '../SettingsPanel';

const SuggestionBox: React.FC = () => {
  const [showTerm, setShowTerm] = useState(true);
  const [showCollection, setShowCollection] = useState(true);
  const [showProduct, setShowProduct] = useState(true);
  const [minChars, setMinChars] = useState(2);
  const [suggestions, setSuggestions] = useState<any>([]);

  const handleInputChange = async (input: string) => {
    console.log(input)
    if (input.length >= minChars) {
      // Replace the API_URL with your JSON Generator API URL
      try {
        const response = await axios.get('https://api.json-generator.com/templates/KTI5CZl-fHUh/data?access_token=ojhs9l4x3reejpz79gevd4eh1xc2pn7dr7t1ss45');
        console.log('response', response);
        setSuggestions(response.data);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className="suggestion-box">
      <SearchBox onInputChange={handleInputChange} />
      {/* Display the ResultBlock components based on settings */}
      {showTerm && <ResultBlock type="Term" data={suggestions.Term} />}
      {showCollection && <ResultBlock type="Collection" data={suggestions.Collection} />}
      {showProduct && <ResultBlock type="Product" data={suggestions.Product} />}
      <SettingsPanel
        showTerm={showTerm}
        showCollection={showCollection}
        showProduct={showProduct}
        minChars={minChars}
        setShowTerm={setShowTerm}
        setShowCollection={setShowCollection}
        setShowProduct={setShowProduct}
        setMinChars={setMinChars}
      />
    </div>
  );
};

export default SuggestionBox;
