import { createContext, useContext, useState, ReactNode } from 'react';

interface JsonContextType {
  hasFile: boolean;
  jsonObject: object | null;
  setHasFile: (hasFile: boolean) => void;
  setJsonObject: (jsonObject: object | null) => void;
}

const JsonContext = createContext<JsonContextType | undefined>(undefined);

interface JsonContextProviderProps {
  children: ReactNode;
}

const JsonContextProvider: React.FC<JsonContextProviderProps> = ({
  children,
}) => {
  const [hasFile, setHasFile] = useState<boolean>(false);
  const [jsonObject, setJsonObject] = useState<object | null>(null);

  return (
    <JsonContext.Provider
      value={{ hasFile, jsonObject, setHasFile, setJsonObject }}
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
