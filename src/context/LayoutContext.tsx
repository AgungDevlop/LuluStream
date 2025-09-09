import { createContext, useContext, useState, ReactNode } from 'react';

// Tipe untuk nilai konteks
interface LayoutContextType {
  showSearch: boolean;
  setShowSearch: (show: boolean) => void;
}

// Buat Konteks dengan nilai awal undefined
const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

// Buat Provider Komponen
export const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <LayoutContext.Provider value={{ showSearch, setShowSearch }}>
      {children}
    </LayoutContext.Provider>
  );
};

// Buat custom hook untuk menggunakan konteks dengan lebih mudah
export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
};