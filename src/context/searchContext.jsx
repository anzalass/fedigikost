import { createContext, useContext, useState } from "react";

const Search = createContext();

const SearchContext = ({ children }) => {
  const [keyword, setKeyword] = useState("");

  return (
    <Search.Provider value={[keyword, setKeyword]}>{children}</Search.Provider>
  );
};

const useSearch = () => useContext(Search);
export { useSearch, SearchContext };
