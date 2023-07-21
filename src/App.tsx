import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { SuggestionBox } from './Containers/SuggestionBox';

import './App.css';
import { SuggestionsType } from './types/type';
import { ResultBlock } from './components/ResultBlock';

function App() {
  const [data, setData] = useState<SuggestionsType>({
    collections: [],
    products: [],
    suggestion_terms: [],
  });
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseCollection = await axios.get(
          'https://api.json-generator.com/templates/KTI5CZl-fHUh/data?access_token=ojhs9l4x3reejpz79gevd4eh1xc2pn7dr7t1ss45'
        );
        const responseProducts = await axios.get(
          'https://api.json-generator.com/templates/oAfva9ERlocD/data?access_token=ojhs9l4x3reejpz79gevd4eh1xc2pn7dr7t1ss45'
        );
        const responseSuggestionTerms = await axios.get(
          'https://api.json-generator.com/templates/FIwEPy2AFl6H/data?access_token=ojhs9l4x3reejpz79gevd4eh1xc2pn7dr7t1ss45'
        );

        setData({
          collections: responseCollection.data,
          products: responseProducts.data,
          suggestion_terms: responseSuggestionTerms.data,
        });
      } catch (error) {
        console.error('Error fetching', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (title: string) => {
    setSearchValue(title);
  };

  return (
    <div className="App">
      <div className="search-container">
        <SuggestionBox data={data} handleSearch={handleSearch} />
        {searchValue && (
          <ResultBlock
          type="Result"
          data={[{title: searchValue}]}
          onClick={() => {}}
        />
        )}
      </div>
    </div>
  );
}

export default App;
