import clsx from 'clsx';
import { useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import Details from './Details';

interface Props {
  data: any;
}

const generateContent = (
  data: any,
  ref: (node: Element | null | undefined) => void
) => {
  const dataType = typeof data;

  if (data === null) return <p ref={ref}>null</p>;

  if (data === undefined) return <p ref={ref}>undefined</p>;

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
      </div>
    );
  }

  if (dataType === 'string') {
    return <p ref={ref}>"{data}"</p>;
  }

  return <span ref={ref}>{data}</span>;
};

function JsonItem({ data }: Props) {
  const [ref, inView] = useInView();

  const generatedComponent = useMemo(
    () => generateContent(data, ref),
    [data, ref]
  );

  if (!inView) {
    return <div ref={ref}></div>;
  }

  return generatedComponent;
}

export default JsonItem;
