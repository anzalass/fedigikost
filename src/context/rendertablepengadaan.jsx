import { createContext, useContext, useState } from "react";

const RenderTablePengadaan = createContext();

const RenderTablePengadaanContext = ({ children }) => {
  const [render, setRender] = useState(false);

  return (
    <RenderTablePengadaan.Provider value={[render, setRender]}>
      {children}
    </RenderTablePengadaan.Provider>
  );
};

const useRender = () => useContext(RenderTablePengadaan);
export { useRender, RenderTablePengadaanContext };
