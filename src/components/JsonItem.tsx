import clsx from 'clsx';
import { useEffect, useState } from 'react'; // Adicionei useEffect aqui
import { useInView } from 'react-intersection-observer';

interface Props {
  data: any;
}

function JsonItem({ data }: Props) {
  const [ref, inView] = useInView();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

  if (!isVisible) {
    return <div ref={ref}></div>;
  }

  if (data === null) return <p ref={ref}>null</p>;
  if (data === undefined) return <p ref={ref}>undefined</p>;

  const dataType = typeof data;

  if (dataType === 'object') {
    const keys = Object.keys(data);

    return (
      <div ref={ref}>
        {keys.map((key) => {
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

          let stringRepresentation: string;
          if (typeof childData === 'string')
            stringRepresentation = `"${childData}"`;
          else if (childData === null) stringRepresentation = 'null';
          else if (childData === undefined) stringRepresentation = 'undefined';
          else stringRepresentation = childData.toString();

          return (
            <p key={key.toString()}>
              <span
                className={clsx('key', {
                  isIndex: !Number.isNaN(Number(key)),
                })}
              >
                {key}:
              </span>{' '}
              {stringRepresentation}
            </p>
          );
        })}
      </div>
    );
  } else if (dataType === 'string') {
    return <p ref={ref}>"{data}"</p>;
  }

  return <span ref={ref}>{data}</span>;
}

export default JsonItem;
