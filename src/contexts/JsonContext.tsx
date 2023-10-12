import { parse } from 'best-effort-json-parser';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

interface JsonContextType {
  currentIndex: number;
  file: File | undefined;
  jsonObject: object | null;
  loadNextPage: () => void;
  loadPreviousPage: () => void;
  setFile: Dispatch<SetStateAction<File | undefined>>;
  setJsonObject: Dispatch<SetStateAction<object | null>>;
}

const JsonContext = createContext<JsonContextType | undefined>(undefined);

interface JsonContextProviderProps {
  children: ReactNode;
}

const JsonContextProvider: React.FC<JsonContextProviderProps> = ({
  children,
}) => {
  const index = useRef<number>(0);
  const [file, setFile] = useState<File | undefined>();
  const [jsonObject, setJsonObject] = useState<object | null>(null);

  const offset = 1000;

  const reader = new FileReader();
  reader.onloadend = () => {
    setJsonObject(parse(reader.result as string));
    index.current = index.current + offset;
  };

  const loadPage = () => {
    if (file) {
      const blob = file.slice(index.current, index.current + offset);
      reader.readAsText(blob);
    } else {
      index.current = 0;
    }
  };

  const loadNextPage = () => {
    if (file && file.size - 1 > index.current) {
      loadPage();
    }
  };

  const loadPreviousPage = () => {
    if (file && index.current > 0) {
      index.current = index.current - offset;
      loadPage();
    }
  };

  useEffect(() => {
    loadPage();
  }, [file]);

  return (
    <JsonContext.Provider
      value={{
        currentIndex: index.current,
        file,
        jsonObject,
        loadNextPage,
        loadPreviousPage,
        setFile,
        setJsonObject,
      }}
    >
      {children}
    </JsonContext.Provider>
  );
};

const useJsonContext = () => {
  const context = useContext(JsonContext);
  if (!context) {
    throw new Error('useJsonContext must be used within a JsonContextProvider');
  }
  return context;
};

export { JsonContextProvider, useJsonContext };
