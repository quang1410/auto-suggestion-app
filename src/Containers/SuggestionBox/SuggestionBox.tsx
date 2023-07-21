import { styled } from 'styled-components';
import React, { useState } from 'react';

import { Dropdown } from '../../components/DropDown';
import { InputType } from '../../components/InputType';
import { ResultBlock } from '../../components/ResultBlock';
import { SettingsPanel } from '../../components/SettingsPanel';

import { SuggestionsType } from '../../types/type';
import { device } from '../../utils/constantly';

type PropsSuggestionBoxType = {
  data: SuggestionsType;
  handleSearch: (title: string) => void;
}

const SuggestionBoxStyled = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: 0 auto;

  .box-search {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin: 12px 0;
    height: 45px;
  }

  .box-suggestion {
    position: absolute;
    top: 50px;
    left: 0;
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

const SuggestionBox = (props: PropsSuggestionBoxType) => {
  const { data, handleSearch } = props;

  const [showTerm, setShowTerm] = useState(true);
  const [showCollection, setShowCollection] = useState(true);
  const [showProduct, setShowProduct] = useState(true);
  const [minChars, setMinChars] = useState<string>('1');
  const [suggestions, setSuggestions] = useState<SuggestionsType>({
    collections: [],
    products: [],
    suggestion_terms: [],
  });
  const [valueSearch, setValueSearch] = useState<string>('');

  const handleInputChange = async (input: string) => {
    handleSearch('');
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
    handleSearch(title);
  };

  return (
    <SuggestionBoxStyled className="suggestion-box">
      <div className="box-search">
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

        <div className="box-suggestion">
          {/* Display the ResultBlock components based on settings */}
          {showTerm && (
            <ResultBlock
              type="Term"
              data={suggestions.suggestion_terms}
              onClick={handleClickResultSuggestion}
              valueSearch={valueSearch}
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
      </div>
    </SuggestionBoxStyled>
  );
};

export default SuggestionBox;
