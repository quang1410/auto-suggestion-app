import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { SearchBox } from '../SearchBox';
import { ResultBlock } from '../ResultBlock';
import { SettingsPanel } from '../SettingsPanel';

const SuggestionBox: React.FC = () => {
  const [showTerm, setShowTerm] = useState(true);
  const [showCollection, setShowCollection] = useState(true);
  const [showProduct, setShowProduct] = useState(true);
  const [minChars, setMinChars] = useState(1);
  const [suggestions, setSuggestions] = useState<any>({
    collection: [],
    products: [],
    term: [],
  });
  const [data, setData] = useState<any>({
    collection: [],
    products: [],
    term: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseCollection = await axios.get('https://api.json-generator.com/templates/KTI5CZl-fHUh/data?access_token=ojhs9l4x3reejpz79gevd4eh1xc2pn7dr7t1ss45');
        const responseProducts = await axios.get('https://api.json-generator.com/templates/oAfva9ERlocD/data?access_token=ojhs9l4x3reejpz79gevd4eh1xc2pn7dr7t1ss45');
        const responseSuggestionTerms = await axios.get('https://api.json-generator.com/templates/FIwEPy2AFl6H/data?access_token=ojhs9l4x3reejpz79gevd4eh1xc2pn7dr7t1ss45');

        setData({
          collection: responseCollection.data,
          product: responseProducts.data,
          term: responseSuggestionTerms.data,
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
        collection: data.collection.filter((item: any) => item.title.includes(input)),
        products: data.product.filter((item: any) => item.title.includes(input)),
        term: data.term.filter((item: any) => item.title.includes(input)),
      })
    } else {
      setSuggestions({
        collection: [],
        products: [],
        term: [],
      });
    }
  };

  return (
    <div className="suggestion-box">
      <SearchBox onInputChange={handleInputChange} />
      {/* Display the ResultBlock components based on settings */}
      {showTerm && <ResultBlock type="Term" data={suggestions.term} />}
      {showCollection && <ResultBlock type="Collection" data={suggestions.collection} />}
      {showProduct && <ResultBlock type="Product" data={suggestions.product} />}
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
