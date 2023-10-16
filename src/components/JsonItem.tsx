import clsx from 'clsx';
import { lazy, useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
const Details = lazy(() => import('./Details'));

interface Props {
  data: any;
}

function JsonItem({ data }: Props) {
  const [ref, inView] = useInView();
  const [endRef, reachedEnd] = useInView();
  const keyIndex = useRef([0, 0, 0]);
  const dataType = typeof data;

  useEffect(() => {
    if (dataType === 'object') {
      keyIndex.current = [0, 20, Object.keys(data).length];
    }
  }, []);

  if (reachedEnd) {
    console.log(keyIndex);
    if (keyIndex.current[1] + 20 >= keyIndex.current[2]) {
      keyIndex.current[1] = keyIndex.current[2];
    } else {
      keyIndex.current[1] = keyIndex.current[1] + 20;
    }
  }

  if (!inView) {
    return <div ref={ref}></div>;
  }

  if (data === null) return <p ref={ref}>null</p>;

  if (data === undefined) return <p ref={ref}>undefined</p>;

  if (dataType === 'object') {
    const keys = Object.keys(data).filter(
      (_, i) => i >= keyIndex.current[0] && i < keyIndex.current[1]
    );

    return (
      <div ref={ref}>
        {keys.map((key) => {
          const childData = data[key];
          const isArray = Array.isArray(childData);
          const isObject =
            typeof childData === 'object' &&
            childData !== null &&
            childData !== undefined;

          if (isObject) {
            return (
              <Details
                key={key}
                data={childData}
                isArray={isArray}
                isObject={isObject}
                dataKey={key}
              />
            );
          }

          let stringRepresentation: string;
          if (typeof childData === 'string')
            stringRepresentation = `"${childData}"`;
          else if (childData === null) stringRepresentation = 'null';
          else if (childData === undefined) stringRepresentation = 'undefined';
          else stringRepresentation = childData.toString();

          return (
            <p key={key}>
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

        {keyIndex.current[2] > 0 && <div ref={endRef}></div>}
      </div>
    );
  }

  if (dataType === 'string') {
    return <p ref={ref}>"{data}"</p>;
  }

  return <span ref={ref}>{data}</span>;
}

export default JsonItem;
