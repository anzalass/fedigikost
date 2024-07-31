import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Admin/LoginPage";
import HomePage from "./pages/Admin/HomePage";
import PengadaanBarang from "./pages/Admin/PengadaanBarangPage";
import PengeluaranPage from "./pages/Admin/PemeliharaanPage";
import DataRuanganPage from "./pages/Admin/DataRuanganPage";
import DetailBarangRuangan from "./pages/Admin/DetailBarangRuanganPage";

import DaftarPetugasPage from "./pages/Owner/petugas/DaftarPetugasPage";
import PendaftaranPetugas from "./pages/Owner/petugas/PendaftaranPetugas";
import EditProfilePage from "./pages/Admin/editprofileadmin/EditProfilePage";
import UbahPasswordAdminPage from "./pages/Admin/editprofileadmin/UbahPasswordAdminPage";

import EditPetugasOwnerPage from "./pages/Owner/petugas/EditPetugasPage";
import { store } from "./redux/store";
import { loadUser } from "./redux/actions/user";
import { useDispatch, useSelector } from "react-redux";
import InvoicePage from "./components/InvoicePage";
import DetailPemeliharaanPage from "./components/DetailPemeliharaanPage";
import DetailPengadaanPage from "./components/DetailPengadaanPage";
import PemeliharaanPage from "./pages/Admin/PemeliharaanPage";
import Spinner from "./components/layout/Spinner";
import QrCodeModal from "./pages/Admin/pengadaanbarang/QrCodeModal";
import DetailPengadaan from "./components/admin/pengadaanbarang/DetailPengadaan";
import PrintQRCodePengadaan from "./components/admin/pengadaanbarang/PrintQRCodePengadaan";
import PrintQrCodeModal from "./pages/Admin/pengadaanbarang/PrintQrCodeModal";

function App() {
  const [dataCookie, setDataCookie] = useState([]);
  const { user, isLogin } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser()); // Panggil loadUser ketika komponen di-mount
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* {user?.role == undefined ? ( */}
          <Route path="/" element={isLogin ? <Spinner /> : <LoginPage />} />
          {/* ) : ( */}
          <>
            {/* Owner Routes */}
            <Route
              path="/daftar-petugas"
              element={isLogin ? <PendaftaranPetugas /> : <LoginPage />}
            />
            <Route
              path="/petugas"
              element={isLogin ? <DaftarPetugasPage /> : <LoginPage />}
            />
            <Route
              path="/edit-petugas/:id"
              element={isLogin ? <EditPetugasOwnerPage /> : <LoginPage />}
            />
            <Route
              path="/edit-password/:id"
              element={isLogin ? <UbahPasswordAdminPage /> : <LoginPage />}
            />
            {/* <Route
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
            /> */}
            {/* <Route
              path="/admin/pemeliharaan"
              element={<PemeliharaanAdminPage userSession={dataCookie} />}
            /> */}
          </>
          {/* )} */}
          {/* UNIVERSAL PAGE */}
          <Route
            path="/detail-pemeliharaan/:id"
            element={isLogin ? <DetailPemeliharaanPage /> : <LoginPage />}
          />
          <Route
            path="/detail-pengadaan/:id"
            element={isLogin ? <DetailPengadaanPage /> : <LoginPage />}
          />
          <Route
            path="/invoice/:id"
            element={isLogin ? <InvoicePage /> : <LoginPage />}
          />
          {/* UNIVERSAL PAGE */}
          <Route
            path="/home"
            element={isLogin ? <HomePage /> : <LoginPage />}
          />
          {/* <Route path="/" element={<HomePage />} /> */}
          <Route
            path="/tambah-barang"
            element={isLogin ? <PengadaanBarang /> : <LoginPage />}
          />
          <Route
            path="/detail-ruangan/:id"
            element={isLogin ? <DetailBarangRuangan /> : <LoginPage />}
          />
          <Route
            path="/printQRRuangan/:id"
            element={isLogin ? <PrintQrCodeModal /> : <LoginPage />}
          />
          <Route
            path="/printQRPengadaan/:id"
            element={isLogin ? <PrintQRCodePengadaan /> : <LoginPage />}
          />
          <Route
            path="/data-ruangan"
            element={isLogin ? <DataRuanganPage /> : <LoginPage />}
          />
          <Route
            path="/pemeliharaan"
            element={isLogin ? <PemeliharaanPage /> : <LoginPage />}
          />
          <Route
            path="/profile"
            element={isLogin ? <EditProfilePage /> : <LoginPage />}
          />
          <Route
            path="/reset-password"
            element={isLogin ? <UbahPasswordAdminPage /> : <LoginPage />}
          />
          <Route
            path="/detail-pengadaan/:id"
            element={<DetailPengadaanPage />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
