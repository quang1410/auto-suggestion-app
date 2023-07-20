import React from 'react';
import { styled } from 'styled-components';

type CardType = {
  id?: string;
  title?: string;
  url?: string;
  price?: string;
  brand?: string;
};

type ResultBlockProps = {
  type: string;
  data: CardType[];
};

const ResultBlockStyled = styled.div`
  width: 400px;
  margin: 10px 0;
  background-color: #fff;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);

  .result-title {
    padding: 10px 15px;
    font-size: 20px;
    color: #333;
  }

  .result-card {
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-bottom: 10px;
    padding: 8px 20px;
    height: 100px;
  }

  .result-card img {
    width: 50px;
    object-fit: cover;
    object-position: center;
    margin-right: 20px;
  }
`;

const ResultBlock = ({ type, data }: ResultBlockProps) => {
  return (
    <ResultBlockStyled>
      <h3 className="result-title">{type}</h3>
      {data &&
        data.map(item => (
          <div className="result-card" key={item.id}>
            {item.url && <img
              src={item.url}
              alt=""
            />}
            <div className="result-detail">
              <h4>{item.title}</h4>
              {item.brand && <h5>{item.brand}</h5>}
              {item.price && <p>{`$${item.price}`}</p>}
            </div>
          </div>
        ))}
    </ResultBlockStyled>
  );
};

export default ResultBlock;
