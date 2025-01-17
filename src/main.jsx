import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { RenderTablePengadaanContext } from "./context/rendertablepengadaan.jsx";
import { SearchContext } from "./context/searchContext.jsx";
import { RenderNotifikasiContext } from "./context/notifikasicontext.jsx";
import { RenderTableKategoriContext } from "./context/rendertablekategori.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <SearchContext>
        <RenderNotifikasiContext>
          <RenderTablePengadaanContext>
            <RenderTableKategoriContext>
              <App />
            </RenderTableKategoriContext>
          </RenderTablePengadaanContext>
        </RenderNotifikasiContext>
      </SearchContext>
    </Provider>
  </React.StrictMode>
);
