import React, { useState, useEffect } from "react";
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

import PemeliharaanBarangOwner from "./pages/Owner/Pemeliharaanbarang/PemeliharaanBarangOwner";
import DataRuanganOwnerPage from "./pages/Owner/dataruangan/DataRuanganOwnerPage";
import TambahRuanganOwner from "./pages/Owner/dataruangan/TambahRuanganOwner";
import EditDataRuanganOwner from "./pages/Owner/dataruangan/EditDataRuanganOwner";
import DetailRuanganOwner from "./pages/Owner/detailruangan.jsx/DetailRuanganOwner";
import DaftarPetugasPage from "./pages/Owner/petugas/DaftarPetugasPage";
import PendaftaranPetugas from "./pages/Owner/petugas/PendaftaranPetugas";
import EditUserPage from "./pages/Admin/editprofileadmin/EditProfileAdminPage";
import EditProfileAdminPage from "./pages/Admin/editprofileadmin/EditProfileAdminPage";
import UbahPasswordAdminPage from "./pages/Admin/editprofileadmin/UbahPasswordAdminPage";
import PengadaanBarangAdminPage from "./pages/Admin/pengadaanbarang/PengadaanBarangAdminPage";
import EditPengadaanAdminPage from "./pages/Admin/pengadaanbarang/EditPengadaanAdminPage";
import KategoriAdminPage from "./pages/Admin/pengadaanbarang/KategoriAdminPage";
import EditPetugasOwnerPage from "./pages/Owner/petugas/EditPetugasOwnerPage";
import EditProfileOwnerPage from "./pages/Owner/profile/EditProfileOwnerPage";
import PemeliharaanAdminPage from "./pages/Admin/maintenenceadmin/PemeliharaanAdminPage";
import { store } from "./redux/store";
import { loadUser } from "./redux/actions/user";
import { useSelector } from "react-redux";
import InvoicePage from "./components/InvoicePage";
import DetailPemeliharaanPage from "./components/DetailPemeliharaanPage";
import DetailPengadaanPage from "./components/DetailPengadaanPage";

function App() {
  const [dataCookie, setDataCookie] = useState([]);
  const { isLogin, user } = useSelector((state) => state.user);
  useEffect(() => {
    store.dispatch(loadUser());
  }, [isLogin === true]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          {user?.role === undefined ? (
            <Route path="/" element={<LoginPage />} />
          ) : user?.role === 1 ? (
            <>
              {/* Owner Routes */}
              <Route
                path="/owner/"
                element={<HomePageOwner userSession={dataCookie} />}
              />
              <Route
                path="/owner/pengadaan-barang"
                element={<PengadaanBarangOwner />}
              />
              <Route
                path="/owner/tambah-barang"
                element={<TambahBarangOwner />}
              />
              <Route path="/owner/kategori" element={<TambahKategoriOwner />} />
              <Route
                path="/owner/edit-barang/:id"
                element={<EditBarangOwner />}
              />
              <Route
                path="/owner/pemeliharaan"
                element={<PemeliharaanBarangOwner />}
              />

              <Route
                path="/owner/data-ruangan"
                element={<DataRuanganOwnerPage />}
              />
              <Route
                path="/owner/tambah-ruangan"
                element={<TambahRuanganOwner />}
              />
              <Route
                path="/owner/edit-ruangan"
                element={<EditDataRuanganOwner />}
              />
              <Route
                path="/owner/detail-ruangan/:id"
                element={<DetailRuanganOwner />}
              />
              <Route path="/daftar-petugas" element={<PendaftaranPetugas />} />
              <Route path="/petugas" element={<DaftarPetugasPage />} />
              <Route
                path="/edit-petugas/:id"
                element={<EditPetugasOwnerPage />}
              />
              <Route path="/owner/profile" element={<EditProfileOwnerPage />} />
            </>
          ) : (
            <>
              <Route
                path="/admin/pengadaan"
                element={<PengadaanBarangAdminPage userSession={dataCookie} />}
              />
              <Route
                path="/admin/edit-pengadaan/:id"
                element={<EditPengadaanAdminPage userSession={dataCookie} />}
              />
              <Route
                path="/admin/kategori"
                element={<KategoriAdminPage userSession={dataCookie} />}
              />
              <Route
                path="/admin/pemeliharaan"
                element={<PemeliharaanAdminPage userSession={dataCookie} />}
              />
            </>
          )}
          {/* UNIVERSAL PAGE */}
          <Route
            path="/detail-pemeliharaan/:id"
            element={<DetailPemeliharaanPage />}
          />
          <Route
            path="/detail-pengadaan/:id"
            element={<DetailPengadaanPage />}
          />
          <Route path="/invoice/:id" element={<InvoicePage />} />
          {/* UNIVERSAL PAGE */}
          <Route path="/home" element={<HomePage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/tambah-barang" element={<PengadaanBarang />} />
          <Route path="/detail-ruangan/:id" element={<DetailBarangRuangan />} />
          <Route path="/data-ruangan" element={<DataRuanganPage />} />
          <Route path="/pengeluaran" element={<PengeluaranPage />} />
          <Route path="/profile" element={<EditProfileAdminPage />} />
          <Route path="/reset-password" element={<UbahPasswordAdminPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
