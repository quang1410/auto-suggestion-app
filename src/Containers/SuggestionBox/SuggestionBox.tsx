import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { InputType } from '../../components/InputType';
import { ResultBlock } from '../../components/ResultBlock';
import { SettingsPanel } from '../../components/SettingsPanel';
import { SuggestionsType } from '../../types/type';
import { styled } from 'styled-components';
import { Dropdown } from '../../components/DropDown';
import { device } from '../../utils/constantly';

const SuggestionBoxStyled = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: 0 auto;

  .box-search {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin: 12px 0;
    height: 45px;
  }

  .box-suggestion {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @media ${device.mobileS} { 
    .box-search {
    justify-content: center;
  }

  .box-suggestion {
    align-items: center;
  }
  }

  @media ${device.tablet} { 
    .box-search {
    justify-content: flex-start;
  }

  .box-suggestion {
    align-items: flex-start;
  }
  }
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
        console.error('Error fetching suggestions:', error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = async (input: string) => {
    setValueSearch(input);
    if (input.length >= Number(minChars)) {
      setSuggestions({
        collections: data.collections.filter(item =>
          item.title.toLocaleLowerCase().includes(input.toLocaleLowerCase())
        ),
        products: data.products.filter(item =>
          item.title.toLocaleLowerCase().includes(input.toLocaleLowerCase())
        ),
        suggestion_terms: data.suggestion_terms.filter(item =>
          item.title.toLocaleLowerCase().includes(input.toLocaleLowerCase())
        ),
      });
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
  };

  return (
    <SuggestionBoxStyled className="suggestion-box">
      <div className='box-search'>
        <InputType
          value={valueSearch}
          type="text"
          label=""
          isIcon={true}
          placeholder="Type to search ..."
          onInputChange={handleInputChange}
        />
        <Dropdown>
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
        </Dropdown>
      </div>
      <div className='box-suggestion'>
        {/* Display the ResultBlock components based on settings */}
      {showTerm && (
        <ResultBlock
          type="Term"
          data={suggestions.suggestion_terms}
          onClick={handleClickResultSuggestion}
        />
      )}
      {showCollection && (
        <ResultBlock
          type="Collection"
          data={suggestions.collections}
          onClick={handleClickResultSuggestion}
        />
      )}
      {showProduct && (
        <ResultBlock
          type="Product"
          data={suggestions.products}
          onClick={handleClickResultSuggestion}
        />
      )}
      </div>
    </SuggestionBoxStyled>
  );
};

export default SuggestionBox;
