import { styled } from 'styled-components';
import { device } from '../../utils/constantly';

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
  onClick?: (title: string) => void;
};

const ResultBlockStyled = styled.div`
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
    height: 50px;
  }

  .result-card img {
    width: 50px;
    object-fit: cover;
    object-position: center;
    margin-right: 20px;
  }

  @media ${device.mobileS} { 
    width: 250px;
  }

  @media ${device.tablet} { 
    width: 375px;
  }
`;

const ResultBlock = ({ type, data, onClick }: ResultBlockProps) => {
  const handleClick = (title: string = '') => {
    onClick && onClick(title);
  };

  return (
    <ResultBlockStyled>
      {data.length > 0 && <h3 className="result-title">{type}</h3>}
      {data &&
        data.map(item => (
          <div className="result-card" key={item.id} onClick={handleClick.bind(this, item.title)}>
            {item.url && <img
              src={item.url}
              alt=""
            />}
            <div className="result-detail">
              <span>{item.title}</span>
              {item.brand && <p>{item.brand}</p>}
              {item.price && <b>{`$${item.price}`}</b>}
            </div>
          </div>
        ))}
    </ResultBlockStyled>
  );
};

export default ResultBlock;
