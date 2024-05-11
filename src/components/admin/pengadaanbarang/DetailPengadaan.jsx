import axios from "axios";
import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";

export default function DetailPengadaan({ open, setOpen, value }) {
  const [pengadaan, setPengadaan] = useState([]);
  const [ruang, setRuang] = useState([]);
  const [barang, setBarang] = useState([]);
  const [data, setData] = useState({
    namaBarang: "",
    kodeBarang: "",
    kodeRuang: "",
    merek: "",
    buktiNota: "",
    spesifikasi: "",
    tanggalPembelian: "",
    ruang: "",
    supplier: "",
    quantity: 0,
    hargaBarang: 0,
    totalHargaBarang: 0,
  });
  useEffect(() => {
    getDataByID();
    fetchData();
  }, [value]);

  const fetchData = async () => {
    const getRuang = await axios.get("http://127.0.0.1:8000/api/getRuang");
    const getBarang = await axios.get("http://127.0.0.1:8000/api/getKategori");

    if (getRuang) {
      setRuang(getRuang.data.results);
      setBarang(getBarang.data.results);
    }
  };

  const getDataByID = async () => {
    const result = await axios.get(
      "http://127.0.0.1:8000/api/findPengadaan/" + value
    );
    setPengadaan(result);
    setData((prevData) => ({
      ...prevData,
      kodeBarang: result.data.results.kodeBarang,
      kodeRuang: result.data.results.kodeRuang,
      merek: result.data.results.merek,
      buktiNota: result.data.results.buktiNota,
      spesifikasi: result.data.results.spesifikasi,
      tanggalPembelian: result.data.results.tanggalPembelian,
      namaBarang: result.data.results.namaBarang,
      ruang: result.data.results.ruang,
      supplier: result.data.results.supplier,
      quantity: result.data.results.quantity,
      hargaBarang: result.data.results.hargaBarang,
      totalHargaBarang:
        result.data.results.quantity * result.data.results.hargaBarang,
    }));
    console.log("result : ", result.data.results.merek);
  };
  return (
    <div className="w-full fixed left-0 top-0 h-screen bg-[#00000030] z-40">
      <div className="h-screen relative  mx-auto w-[80%] p-3 bg-white rounded-lg">
        <button
          onClick={() => setOpen(!open)}
          className="font-abc text-xl absolute right-3 font-[600]"
        >
          X
        </button>
        <div className="w-full mx-auto gap-3  ">
          <div className="w-[50%] mx-auto">
            <img
              src={data.buktiNota}
              className="border-2 w-[90%] h-[90%] object-cover "
              alt="image"
            />
          </div>
          <div className="w-[50%] mx-auto font-abc">
            <div className="mt-4">
              <h1 className="font-[600]">No Resi</h1>
              <h1>{"ABC110903"}</h1>
            </div>
            <div className="mt-4">
              <h1 className="font-[600]">Nama Barang</h1>
              <h1>{data.namaBarang}</h1>
            </div>
            <div className="mt-4">
              <h1 className="font-[600]">Tanggal Pembelian</h1>
              <h1>{data.tanggalPembelian}</h1>
            </div>
            <div className="mt-4">
              <h1 className="font-[600]">Harga Barang</h1>
              <h1>{data.hargaBarang}</h1>
            </div>
            <div className="mt-4">
              <h1 className="font-[600]">Quantity</h1>
              <h1>{data.quantity}</h1>
            </div>
            <div className="mt-4">
              <h1 className="font-[600]">Lokasi Barang</h1>
              <h1>{data.kodeRuang}</h1>
            </div>
            <div className="mt-4">
              <h1 className="font-[600]">Total Harga</h1>
              <h1>{data.totalHargaBarang}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
