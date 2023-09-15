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
import AccPengadaanBarangOwner from "./pages/Owner/pengadaanbarang/AccPengadaanBarangOwner";

import axios from "axios";

function App() {
  const [dataCookie, setDataCookie] = useState([]);
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");
  const token = localStorage.getItem("token");

  // useEffect(() => {
  //   // Add a delay of 1000 milliseconds (1 second) before checking userSession
  //   const delay = 2400;

  //   const timer = setTimeout(() => {
  //     if (dataCookie.id != undefined) {
  //       setLoading(false);
  //     }
  //   }, delay);

  //   // Clear the timer if the component unmounts or userSession changes
  //   return () => clearTimeout(timer);
  // }, [dataCookie]);

  useEffect(() => {
    getSession();
    console.log(token);
  }, []);

  // Set the authorization header with the token
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const getSession = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/user", {
        headers,
      });

      console.log("response : ", response.data);
      setDataCookie(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <LoginPage userSession={dataCookie} loadingValue={loading} />
            }
          />
          <Route
            path="/"
            Component={() => <HomePage userSession={dataCookie} />}
          />
          <Route
            path="/tambah-barang"
            Component={() => <PengadaanBarang userSession={dataCookie} />}
          />
          <Route
            path="/detail-ruangan/:id"
            Component={() => <DetailBarangRuangan userSession={dataCookie} />}
          />
          <Route
            path="/data-ruangan"
            element={<DataRuanganPage userSession={dataCookie} />}
          />
          <Route
            path="/pengeluaran"
            element={<PengeluaranPage userSession={dataCookie} />}
          />
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
