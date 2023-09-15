import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Admin/LoginPage";
import HomePage from "./pages/Admin/HomePage";
import PengadaanBarang from "./pages/Admin/PengadaanBarangPage";
import PengeluaranPage from "./pages/Admin/PemeliharaanPage";
import DataRuanganPage from "./pages/Admin/DataRuanganPage";
import DetailBarangRuangan from "./pages/Admin/DetailBarangRuanganPage";
import HomePageOwner from "./pages/Owner/HomepageOwner";
import PengadaanBarangOwner from "./pages/Owner/pengadaanbarang/PengadaanBarangOwner";
import TambahBarangOwner from "./pages/Owner/pengadaanbarang/TambahBarangOwner";
import TambahKategoriOwner from "./pages/Owner/pengadaanbarang/TambahKategoriOwner";
import EditBarangOwner from "./pages/Owner/pengadaanbarang/EditBarangOwner";
import AccPengadaanBarangOwner from "./pages/Owner/pengadaanbarang/AccPengadaanBarangOwner";

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
          <Route
            path="/owner/pengadaan-barang"
            element={<PengadaanBarangOwner />}
          />
          <Route path="/owner/tambah-barang" element={<TambahBarangOwner />} />
          <Route path="/owner/kategori" element={<TambahKategoriOwner />} />
          <Route path="/owner/edit-barang/:id" element={<EditBarangOwner />} />
          <Route
            path="/owner/menunggu-acc/"
            element={<AccPengadaanBarangOwner />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
