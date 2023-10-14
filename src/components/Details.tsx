import clsx from 'clsx';
import { useState } from 'react';
import JsonItem from './JsonItem';

interface Props {
  dataKey: string;
  isArray: boolean;
  isObject: boolean;
  data: object;
}

function Details({ dataKey, isArray, isObject, data }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDetails = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <details>
      <summary
        onClick={toggleDetails}
        className={clsx('key', {
          isArray: isArray,
          isObject: !isArray && isObject,
          isIndex: !Number.isNaN(Number(dataKey)),
        })}
      >
        {dataKey}:
      </summary>
      {isOpen && <JsonItem data={data} />}
      <summary className='bracket'>{isArray ? ']' : '}'}</summary>
    </details>
  );
}

export default Details;
