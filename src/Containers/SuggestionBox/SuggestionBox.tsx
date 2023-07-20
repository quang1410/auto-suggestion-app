import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { InputType } from '../../components/InputType';
import { ResultBlock } from '../../components/ResultBlock';
import { SettingsPanel } from '../../components/SettingsPanel';
import { SuggestionsType } from '../../types/type';
import { styled } from 'styled-components';

const SuggestionBoxStyled = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: 0 auto;
`;

const SuggestionBox = () => {
  const [showTerm, setShowTerm] = useState(true);
  const [showCollection, setShowCollection] = useState(true);
  const [showProduct, setShowProduct] = useState(true);
  const [minChars, setMinChars] = useState<string>('1');
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
  const [valueSearch, setValueSearch] = useState<string>('');

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
    setValueSearch(input);
    if (input.length >= Number(minChars)) {
      setSuggestions({
        collections: data.collections.filter((item) => item.title.toLocaleLowerCase().includes(input.toLocaleLowerCase())),
        products: data.products.filter((item) => item.title.toLocaleLowerCase().includes(input.toLocaleLowerCase())),
        suggestion_terms: data.suggestion_terms.filter((item) => item.title.toLocaleLowerCase().includes(input.toLocaleLowerCase())),
      })
    } else {
      setSuggestions({
        collections: [],
        products: [],
        suggestion_terms: [],
      });
    }
  };

  const handleClickResultSuggestion = (title: string = '') => {
    setValueSearch(title);
    setSuggestions({
      collections: [],
      products: [],
      suggestion_terms: [],
    });
  }

  return (
    <SuggestionBoxStyled className="suggestion-box">
      <InputType value={valueSearch} type='text' label='' isIcon={true} placeholder='Type to search ...' onInputChange={handleInputChange} />
      {/* Display the ResultBlock components based on settings */}
      {showTerm && <ResultBlock type="Term" data={suggestions.suggestion_terms} onClick={handleClickResultSuggestion} />}
      {showCollection && <ResultBlock type="Collection" data={suggestions.collections} onClick={handleClickResultSuggestion} />}
      {showProduct && <ResultBlock type="Product" data={suggestions.products} onClick={handleClickResultSuggestion} />}
      <SettingsPanel
        showTerm={showTerm}
        showCollection={showCollection}
        showProduct={showProduct}
        minChars={Number(minChars)}
        setShowTerm={setShowTerm}
        setShowCollection={setShowCollection}
        setShowProduct={setShowProduct}
        setMinChars={setMinChars}
      />
    </SuggestionBoxStyled>
  );
};

export default SuggestionBox;
