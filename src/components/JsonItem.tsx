import clsx from 'clsx';

interface Props {
  data: any;
}

function JsonItem({ data }: Props) {
  if (data === null) return <p>null</p>;
  if (data === undefined) return <p>undefined</p>;

  const dataType = typeof data;
  if (dataType === 'object') {
    const keys = Object.keys(data);

    return keys.map((key) => {
      const childData = data[key];
      const isArray = Array.isArray(childData);
      const isObject =
        typeof childData === 'object' &&
        childData !== null &&
        childData !== undefined;

      if (isObject || isArray) {
        return (
          <details key={key.toString()} open>
            <summary
              className={clsx('key', {
                isArray: isArray,
                isObject: !isArray && isObject,
                isIndex: !Number.isNaN(Number(key)),
              })}
            >
              {key}:
            </summary>
            <JsonItem data={childData} />
            <summary className='bracket'>{isArray ? ']' : '}'}</summary>
          </details>
        );
      }
      let stringRepresennation: string;
      if (typeof childData == 'string') stringRepresennation = `"${childData}"`;
      else if (childData === null) stringRepresennation = 'null';
      else if (childData === undefined) stringRepresennation = 'undefined';
      else stringRepresennation = childData.toString();

      return (
        <p key={key.toString()}>
          <span
            className={clsx('key', {
              isIndex: !Number.isNaN(Number(key)),
            })}
          >
            {key}:
          </span>{' '}
          {stringRepresennation}
        </p>
      );
    });
  } else if (dataType === 'string') {
    return <p>"{data}"</p>;
  }
  return <span>{data}</span>;
}

export default JsonItem;
