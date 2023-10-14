import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

interface JsonContextType {
  file: File | undefined;
  jsonObject: object | null;
  loading: boolean;
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
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState<File | undefined>();
  const [jsonObject, setJsonObject] = useState<object | null>(null);

  const reader = new FileReader();
  reader.onloadend = () => {
    const json = JSON.parse(reader.result as string);
    setJsonObject(json);
    setLoading(false);
  };

  useEffect(() => {
    if (file) {
      setLoading(true);
      reader.readAsText(file);
    }
  }, [file]);

  return (
    <JsonContext.Provider
      value={{
        file,
        jsonObject,
        loading,
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
