import React, { useEffect, useRef } from 'react'

export type CardType = {
  id?: string;
  title?: string;
  url?: string;
  price?: string;
  brand?: string;
};

type ResultCardType = CardType & {
  onClick: () => void; 
  valueSearch: string;
}


const ResultCard = (props: ResultCardType) => {
  const {url, title, brand, price, onClick, valueSearch } = props;
  const titleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const innerTextTitle = () => {
      if(title && titleRef.current) {
        titleRef.current.innerHTML = title.replace(new RegExp(valueSearch || '', 'gi'), '<strong>$&</strong>')
      }
    };

    innerTextTitle();
  }, [title, valueSearch]);

  return (
    <div className="result-card" onClick={onClick}>
            {url && <img
              src={url}
              alt=""
            />}
            <div className="result-detail">
              {title && <p ref={titleRef}>{''}</p>}
              {brand && <p>{brand}</p>}
              {price && <b>{`$${price}`}</b>}
            </div>
          </div>
  )
}

export default ResultCard