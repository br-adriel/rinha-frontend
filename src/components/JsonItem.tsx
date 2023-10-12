interface Props {
  data: any;
}

function JsonItem({ data }: Props) {
  if (typeof data === 'object') {
    const keys = Object.keys(data);

    return keys.map((key) => {
      const isArray = Array.isArray(data[key]);
      const isObject = typeof data[key] === 'object';

      if (isObject || isArray) {
        return (
          <details key={key.toString()} open>
            <summary className={`${isArray ? 'isArray' : 'isObject'} key`}>
              {key}:
            </summary>
            <JsonItem data={data[key]} />
            <summary className='bracket'>{isArray ? ']' : '}'}</summary>
          </details>
        );
      }
      return (
        <p key={key.toString()}>
          <span className='key'>{key}:</span>{' '}
          {typeof data[key] == 'string' ? '"' + data[key] + '"' : data[key]}
        </p>
      );
    });
  } else {
    if (typeof data == 'string') return <p>"{data}"</p>;
    return <span>{data}</span>;
  }
}

export default JsonItem;
