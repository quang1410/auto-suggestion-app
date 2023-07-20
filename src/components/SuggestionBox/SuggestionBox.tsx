import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { SearchBox } from '../SearchBox';
import { ResultBlock } from '../ResultBlock';
import { SettingsPanel } from '../SettingsPanel';
import { SuggestionsType } from '../../types/type';

const SuggestionBox: React.FC = () => {
  const [showTerm, setShowTerm] = useState(true);
  const [showCollection, setShowCollection] = useState(true);
  const [showProduct, setShowProduct] = useState(true);
  const [minChars, setMinChars] = useState(1);
  const [suggestions, setSuggestions] = useState<SuggestionsType>({
    collections: [],
    products: [],
    suggestion_terms: [],
  });
  const [data, setData] = useState<SuggestionsType>({
    collections: [],
    products: [],
    suggestion_terms: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseCollection = await axios.get('https://api.json-generator.com/templates/KTI5CZl-fHUh/data?access_token=ojhs9l4x3reejpz79gevd4eh1xc2pn7dr7t1ss45');
        const responseProducts = await axios.get('https://api.json-generator.com/templates/oAfva9ERlocD/data?access_token=ojhs9l4x3reejpz79gevd4eh1xc2pn7dr7t1ss45');
        const responseSuggestionTerms = await axios.get('https://api.json-generator.com/templates/FIwEPy2AFl6H/data?access_token=ojhs9l4x3reejpz79gevd4eh1xc2pn7dr7t1ss45');

        setData({
          collections: responseCollection.data,
          products: responseProducts.data,
          suggestion_terms: responseSuggestionTerms.data,
        });
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = async (input: string) => {
    console.log(input);
    console.log('data', data);
    console.log('setSuggestions', suggestions);
    if (input.length >= minChars) {
      setSuggestions({
        collections: data.collections.filter((item: any) => item.title.includes(input)),
        products: data.products.filter((item: any) => item.title.includes(input)),
        suggestion_terms: data.suggestion_terms.filter((item: any) => item.title.includes(input)),
      })
    } else {
      setSuggestions({
        collections: [],
        products: [],
        suggestion_terms: [],
      });
    }
  };

  console.log('suggestion_terms', suggestions.suggestion_terms);

  return (
    <div className="suggestion-box">
      <SearchBox onInputChange={handleInputChange} />
      {/* Display the ResultBlock components based on settings */}
      {showTerm && <ResultBlock type="Term" data={suggestions.suggestion_terms} />}
      {showCollection && <ResultBlock type="Collection" data={suggestions.collections} />}
      {showProduct && <ResultBlock type="Product" data={suggestions.products} />}
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
