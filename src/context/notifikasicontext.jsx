import { createContext, useContext, useState } from "react";

const RenderNotifikasi = createContext();

const RenderNotifikasiContext = ({ children }) => {
  const [notif, setNotif] = useState({
    notifikasi: [],
    totalnotifikasi: 0,
  });

  return (
    <RenderNotifikasi.Provider value={[notif, setNotif]}>
      {children}
    </RenderNotifikasi.Provider>
  );
};

const useContextNotifikasi = () => useContext(RenderNotifikasi);
export { useContextNotifikasi, RenderNotifikasiContext };
