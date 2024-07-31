import { createContext, useContext, useState } from "react";

const RenderTableKategori = createContext();

const RenderTableKategoriContext = ({ children }) => {
  const [renderkategori, setRenderKategori] = useState(false);

  return (
    <RenderTableKategori.Provider value={[renderkategori, setRenderKategori]}>
      {children}
    </RenderTableKategori.Provider>
  );
};

const useRenderkategori = () => useContext(RenderTableKategori);
export { useRenderkategori, RenderTableKategoriContext };
