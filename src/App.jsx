import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Admin/LoginPage";
import HomePage from "./pages/Admin/HomePage";
import PengadaanBarang from "./pages/Admin/PengadaanBarangPage";
import PengeluaranPage from "./pages/Admin/PemeliharaanPage";
import DataRuanganPage from "./pages/Admin/DataRuanganPage";
import DetailBarangRuangan from "./pages/Admin/DetailBarangRuanganPage";
import HomePageOwner from "./pages/Users/HomepageOwner";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/tambah-barang" element={<PengadaanBarang />} />
          <Route path="/detail-ruangan/:id" element={<DetailBarangRuangan />} />
          <Route path="/data-ruangan" element={<DataRuanganPage />} />
          <Route path="/pengeluaran" element={<PengeluaranPage />} />
          {/* Owner Routes */}
          <Route path="/owner/" element={<HomePageOwner />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
