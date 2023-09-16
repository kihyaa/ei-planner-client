import { createContext, useContext, useState, useMemo } from 'react';

const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
  const [items, setItems] = useState(null);

  const contextValue = useMemo(() => {
    return { items, setItems };
  }, [items, setItems]);

  return (
    <ItemContext.Provider value={contextValue}>
      {children}
    </ItemContext.Provider>
  );
};

export const useItemContext = () => useContext(ItemContext);
