import axios from "axios";
import React, { useEffect, useState } from "react";

export default function EditBarang({ close, setClose, idBarang }) {
  const [pengadaan, setPengadaan] = useState([]);

  const [data, setData] = useState({
    namaBarang: "",
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

  const changePengadaanHandler = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    console.log(data);
  };

  const UpdatePengadaan = async () => {
    try {
      const result = await axios.put(
        "http://127.0.0.1:8000/api/updatePengadaan/" + idBarang,
        data
      );
      console.log(result);
      if (result) {
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDataByID();
  }, [idBarang]);

  const getDataByID = async () => {
    const result = await axios.get(
      "http://127.0.0.1:8000/api/findPengadaan/" + idBarang
    );
    setPengadaan(result);
    setData((prevData) => ({
      ...prevData,
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
    <div className="bg-white w-[96%] mt-3  mb-[200px]  mx-auto p-3 rounded-lg">
      <div className="bg-white w-[96%] mt-3  mb-[200px]  mx-auto p-3 rounded-lg">
        {pengadaan.length !== 0 ? (
          <div className="w-[95%] mx-auto h-[130vh] bg-white rounded-xl">
            <h1 className="font-abc text-xl">Edit Barang</h1>
            <div action="" className="w-[95%] mx-auto mt-2 p-3">
              <div className="w-full mt-4">
                <h1 className="font-abc pb-2 ">Tanggal Pengadaan</h1>
                <input
                  type="date"
                  name="tanggalPembelian"
                  value={data.tanggalPembelian}
                  onChange={(e) => changePengadaanHandler(e)}
                  className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                />
              </div>
              <div className="w-full mt-4">
                <h1 className="font-abc pb-2 ">Kategori</h1>
                <select
                  name="namaBarang"
                  id=""
                  value={data.namaBarang}
                  onChange={(e) => changePengadaanHandler(e)}
                  className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                >
                  <option value="kulkas">kulkas</option>
                  <option value="Television">Television</option>
                  <option value="Kipas Angin">Kipas Angin</option>
                  <option value="Smartphone">Smartphone</option>
                </select>
              </div>
              <div className="w-full mt-4">
                <h1 className="font-abc pb-2">Merek Barang</h1>
                <input
                  type="text"
                  name="merek"
                  value={data.merek}
                  onChange={(e) => changePengadaanHandler(e)}
                  className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                />
              </div>
              {/* <div className="w-full mt-4">
                                <h1 className="font-abc pb-2">Resi Barang</h1>
                                <input
                                    type="text"
                                    className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                                />
                            </div> */}
              <div className="w-full mt-4">
                <h1 className="font-abc pb-2">Foto Nota Pembelian</h1>
                <input
                  type="text"
                  name="buktiNota"
                  value={data.buktiNota}
                  onChange={(e) => changePengadaanHandler(e)}
                  className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                />
              </div>
              {/* <div className="w-full mt-4">
              <h1 className="font-abc pb-2">Alamat</h1>
              <textarea
                name=""
                id=""
                rows="3"
                className="w-full p-3 border-2 border-slate-500"
              ></textarea>
            </div> */}
              <div className="w-full mt-4">
                <h1 className="font-abc pb-2">Spesifikasi Barang</h1>
                <input
                  type="text"
                  name="spesifikasi"
                  value={data.spesifikasi}
                  onChange={(e) => changePengadaanHandler(e)}
                  className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                />
              </div>
              <div className="w-full mt-4">
                <h1 className="font-abc pb-2">Supplier</h1>
                <input
                  type="text"
                  name="supplier"
                  value={data.supplier}
                  onChange={(e) => changePengadaanHandler(e)}
                  className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                />
              </div>
              <div className="w-full mt-4">
                <h1 className="font-abc pb-2">Lokasi Barang</h1>
                <input
                  type="text"
                  name="ruang"
                  value={data.ruang}
                  onChange={(e) => changePengadaanHandler(e)}
                  list="cars"
                  className="w-full border-2 border-slate-500"
                />
                <datalist id="cars">
                  <option value="101">101</option>
                  <option value="102">102</option>
                  <option value="103">103</option>
                  <option value="104">104</option>
                </datalist>
              </div>
              <div className="w-full mt-4">
                <h1 className="font-abc pb-2">Quantitas Barang</h1>
                <input
                  type="text"
                  name="quantity"
                  value={data.quantity}
                  onChange={(e) => changePengadaanHandler(e)}
                  className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                />
              </div>
              <div className="w-full mt-4">
                <h1 className="font-abc pb-2">Harga</h1>
                <input
                  type="text"
                  name="hargaBarang"
                  value={data.hargaBarang}
                  onChange={(e) => changePengadaanHandler(e)}
                  className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                />
              </div>
              <div className="w-full mt-4">
                <h1 className="font-abc pb-2">Total Harga</h1>
                <input
                  type="text"
                  value={data.totalHargaBarang}
                  className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                  disabled
                />
              </div>

              {/* <div className="w-full mt-4">
              <label
                htmlFor="ktp"
                className="h-[20px] w-[50px] text-[13px] font-abc rounded-lg p-2 bg-[#E3E8EF]"
              >
                Upload KTP
              </label>
              <input type="file" id="ktp" name="ktp" className="hidden" />
            </div> */}
              <div className="w-full justify-center mt-12 mb-12 flex items-center">
                <button
                  onClick={() => UpdatePengadaan()}
                  className="bg-[#7B2CBF] px-3 py-1 w-[140px] rounded-md text-[#E5D5F2] font-abc"
                >
                  Simpan
                </button>
                <button
                  onClick={() => setClose(!close)}
                  className="bg-[#E5D5F2] px-3 py-1 w-[140px] rounded-md ml-2  text-[#7B2CBF] font-abc"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
