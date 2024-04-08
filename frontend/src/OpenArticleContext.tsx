import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

interface OpenArticleContextType {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  closeArticle: () => void;
}

const defaultState: OpenArticleContextType = {
  isOpen: false,
  setOpen: () => {},
  closeArticle: () => {},
};

const OpenArticleContext = createContext<OpenArticleContextType>(defaultState);

export const useOpenArticle = () => useContext(OpenArticleContext);

interface OpenArticleProviderProps {
  children: ReactNode;
}

export const OpenArticleProvider: React.FC<OpenArticleProviderProps> = ({
  children,
}) => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const closeArticle = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <OpenArticleContext.Provider value={{ isOpen, setOpen, closeArticle }}>
      {children}
    </OpenArticleContext.Provider>
  );
};
