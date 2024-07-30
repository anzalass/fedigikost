import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRender } from "../../../context/rendertablepengadaan";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { BACKEND_BASE_URL } from "../../../config/base_url";

export default function EditBarang({ close, setClose, idBarang }) {
  const { user } = useSelector((state) => state.user);
  const [pengadaan, setPengadaan] = useState([]);
  const [ruang, setRuang] = useState([]);
  const [barang, setBarang] = useState([]);
  const [buktiNota, setBuktiNota] = useState(null);
  const [render, setRender] = useRender();

  const [data, setData] = useState({
    idUser: user?.id,
    id_pembuat: user?.id,
    role_pembuat: user?.role,
    nama_pembuat: user?.name,
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

  const changePengadaanHandler = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    console.log(data);
  };

  const UpdatePengadaan = async () => {
    setRender(false);
    try {
      const result = await axios.put(
        `${BACKEND_BASE_URL}/api/updatePengadaan/` + idBarang,
        data
      );
      if (result) {
        setClose(!close);
        setRender(true);
        Swal.fire({
          // position: "top-end",
          icon: "success",
          title: "Edit Berhasil",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDataByID();
    fetchData();
  }, [idBarang]);

  const fetchData = async () => {
    const getRuang = await axios.get(`${BACKEND_BASE_URL}/api/getRuang`);
    const getBarang = await axios.get(`${BACKEND_BASE_URL}/api/getKategori`);

    if (getRuang) {
      setRuang(getRuang.data.results);
      setBarang(getBarang.data.results);
    }
  };

  const getDataByID = async () => {
    const result = await axios.get(
      `${BACKEND_BASE_URL}/api/findPengadaan/` + idBarang
    );
    setPengadaan(result);
    setData((prevData) => ({
      ...prevData,
      idUser: user?.id,
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
    <div className="bg-white w-[96%] mt-3  mb-[200px]  mx-auto p-3 rounded-lg">
      <div className="bg-white w-[96%] mt-3  mb-[200px]  mx-auto p-3 rounded-lg">
        {pengadaan.length !== 0 ? (
          <div className="w-[95%] mx-auto h-[130vh] bg-white rounded-xl">
            <h1 className="font-abc text-xl">Edit Barang</h1>
            {/* {buktiNota ? (
              <div className="p-2 border-2 rounded-md mx-auto w-[40%] h-[40%]">
                <img
                  src={URL.createObjectURL(buktiNota)}
                  alt=""
                  className="w-[100%] object-contain   rounded-md mx-auto h-[100%]"
                />
              </div>
            ) : (
              <div className="p-2 border-2 rounded-md mx-auto w-[40%] h-[40%]">
                <img
                  src={data?.buktiNota}
                  alt=""
                  className="w-[100%] object-contain   rounded-md mx-auto h-[100%]"
                />
              </div>
            )} */}

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
                  onChange={(e) => {
                    const selectedBarang = barang.find(
                      (item) => item.kodeBarang === e.target.value
                    );

                    setData({
                      ...data,
                      kodeBarang: selectedBarang.kodeBarang,
                      namaBarang: `${selectedBarang.namaBarang}`,
                      merek: selectedBarang.kategori,
                    });
                  }}
                  className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                >
                  {barang.map((item, index) => {
                    if (item.namaBarang == data.namaBarang) {
                      return (
                        <option
                          key={index}
                          value={`${item.kodeBarang}`}
                          selected
                        >
                          {item.namaBarang}
                        </option>
                      );
                    } else {
                      return (
                        <option key={index} value={`${item.kodeBarang}`}>
                          {item.namaBarang}
                        </option>
                      );
                    }
                  })}
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
                <h1 className="font-abc pb-2">Foto Nota Pembelian</h1>
                <input
                  type="file"
                  name="buktiNota"
                  onChange={(e) => setBuktiNota(e.target.files[0])}
                  className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                />
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
                <select
                  id="cars"
                  name="ruang"
                  onChange={(e) => {
                    const selectedRuang = ruang.find(
                      (item) => item.kodeRuang === e.target.value
                    );

                    setData({
                      ...data,
                      kodeRuang: selectedRuang.kodeRuang,
                      ruang: selectedRuang.ruang,
                    });
                    console.log(data);
                  }}
                  className="w-full border-2 border-slate-500"
                >
                  {ruang.map((item) => {
                    if (item.ruang == data.ruang) {
                      return (
                        <option
                          key={item.kodeBarang}
                          value={item.kodeRuang}
                          selected
                        >
                          {item.ruang}
                        </option>
                      );
                    } else {
                      return (
                        <option key={item.kodeBarang} value={item.kodeRuang}>
                          {item.ruang}
                        </option>
                      );
                    }
                  })}
                </select>
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
