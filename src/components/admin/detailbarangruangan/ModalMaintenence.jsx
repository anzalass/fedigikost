import axios from "axios";
import React, { useEffect, useState } from "react";

export default function ModalMaintenence({ open, setOpen, data, ruang }) {
  const [dataConst, setDataConst] = useState({
    jumlah: 1,
  });
  const [dataBarang, setDataBarang] = useState({
    kodeBarang: "",
    kodeRuang: "",
    keterangan: "",
    idUser: 1,
    jumlah: 1,
    buktiPembayaran: "",
    status: "pending",
    harga: 0,
  });

  useEffect(() => {
    setDataBarang((prevData) => ({
      ...prevData,
      kodeBarang: data.id,
      kodeRuang: ruang,
      keterangan: "",
      jumlah: 1,
      buktiPembayaran: "test.jpg",
      status: "pending",
      harga: 0,
    }));
    setDataConst((prevData) => ({
      ...prevData,
      jumlah: data.qtybarang,
    }));
  }, [data]);

  useEffect(() => {
    if (dataBarang.jumlah > dataConst.jumlah) {
      setDataBarang((prevData) => ({
        ...prevData,
        jumlah: dataConst.jumlah,
      }));
    }
  }, [dataBarang]);

  const handleChange = (e) => {
    setDataBarang({
      ...dataBarang,
      [e.target.name]: e.target.value,
    });
    console.log(dataBarang);
  };

  const tambahPemeliharaan = async () => {
    try {
      const tambah = await axios.post(
        "http://127.0.0.1:8000/api/tambahPemeliharaan",
        dataBarang
      );

      if (tambah) {
        window.location.reload();
      }
    } catch (err) {
      if (err.response) {
        alert("Server Error: " + err.response.data.message);
      } else if (err.request) {
        alert("No response from server");
      } else {
        alert("Error: " + err.message);
      }
    }
  };

  return (
    <div className="w-full h-screen  flex items-center left-0 top-0 fixed z-40 bg-[#00000030]">
      <div className="w-[400px]  h-[250px]  mx-auto bg-white p-3 rounded-lg">
        <div className="w-[90%] mx-auto mt-3 my-auto">
          <div className="w-full">
            <h1>Set Quantity Kipas yang Ingin di Maintenence</h1>
            <input
              type="number"
              name="jumlah"
              value={dataBarang.jumlah}
              onChange={(e) => handleChange(e)}
              className="w-full mt-2 h-[30px] border-2 border-slate-500 rounded-md"
            />
            <h1>Masukkan Harga Maintenance Barang</h1>
            <input
              type="number"
              name="harga"
              onChange={(e) => handleChange(e)}
              className="w-full mt-2 h-[30px] border-2 border-slate-500 rounded-md"
            />
            <h1>Keterangan Barang</h1>
            <input
              type="text"
              name="keterangan"
              onChange={(e) => handleChange(e)}
              className="w-full mt-2 h-[30px] border-2 border-slate-500 rounded-md"
            />
            <div className="mx-auto flex justify-center items-center w-full mt-2">
              <button
                onClick={tambahPemeliharaan}
                className="bg-[#7B2CBF] px-3 py-1 w-[140px] rounded-md text-[#E5D5F2] font-abc"
              >
                Simpan
              </button>
              <button
                onClick={() => setOpen(!open)}
                className="bg-[#E5D5F2] px-3 py-1 w-[140px] rounded-md ml-2  text-[#7B2CBF] font-abc"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
