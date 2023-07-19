import React from 'react';

interface ResultBlockProps {
  type: string;
  data: any[];
}

const ResultBlock: React.FC<ResultBlockProps> = ({ type, data }) => {
  return (
    <div className="result-block">
      <h3>{type}</h3>
      <ul>
        {data &&
          data.map((item) => (
            <li key={item.id}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ResultBlock;
