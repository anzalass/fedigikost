import axios from "axios";
import React, { useEffect, useState } from "react";
import { BACKEND_BASE_URL } from "../../../config/base_url";

export default function EditPemeliharaanModal({ open, id, sisa, setOpen }) {
  const [sisaplusjumlah, setSisaPlusJumlah] = useState(0);
  useEffect(() => {
    fetchData();
  }, [id]);

  const [inputData, setInputData] = useState([]);

  const [err, setErr] = useState([]);

  const handleChange = (e) => {
    if (e.target.name == "jumlah") {
      if (parseInt(e.target.value) > sisaplusjumlah) {
        setInputData({
          ...inputData,
          jumlah: sisaplusjumlah,
        });
      } else {
        setInputData({
          ...inputData,
          [e.target.name]: e.target.value,
        });
      }
    } else {
      setInputData({
        ...inputData,
        [e.target.name]: e.target.value,
      });
    }
    console.log(inputData);
  };

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${BACKEND_BASE_URL}/api/getPemeliharaanById/${id}`
      );
      console.log("resnya : ", res);
      setInputData(res.data.results);
      setSisaPlusJumlah(parseInt(res.data.results.jumlah) + parseInt(sisa));
    } catch (err) {
      console.log(err);
    }
  };

  const EditPemeliharaan = async () => {
    try {
      const res = await axios.put(
        `${BACKEND_BASE_URL}/api/editPemeliharaan/${id}`,
        inputData
      );

      if (res) {
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
      console.log("input datanya : ", inputData);
      setErr(err.response.data.error);
    }
  };
  return (
    <div className="w-full h-screen  flex items-center left-0 top-0 fixed z-40 bg-[#00000030]">
      <div className="w-[400px]  mx-auto bg-white p-3 rounded-lg">
        <div className="w-[90%] mx-auto mt-3 my-auto pb-3">
          <div className="w-full">
            <h1 className="font-abc">
              Edit Detail Maintenence {sisaplusjumlah}
            </h1>
            <div className="">
              <h1>Quantity Barang</h1>
              <input
                type="number"
                name="jumlah"
                value={inputData.jumlah}
                onChange={(e) => handleChange(e)}
                className="w-full mt-2 h-[30px] border-2 border-slate-500 rounded-md"
              />
              {err.jumlah ? <p>{err.jumlah}</p> : null}
              <h1>Harga Maintenence</h1>
              <input
                type="number"
                name="harga"
                value={inputData.harga}
                onChange={(e) => handleChange(e)}
                className="w-full mt-2 h-[30px] border-2 border-slate-500 rounded-md"
              />
              {err.harga ? <p>{err.harga}</p> : null}

              <h1>Keterangan Barang</h1>
              <input
                type="text"
                name="keterangan"
                value={inputData.keterangan}
                onChange={(e) => handleChange(e)}
                className="w-full mt-2 h-[30px] border-2 border-slate-500 rounded-md"
              />
              {err.keterangan ? <p>{err.keterangan}</p> : null}
            </div>
            <div className="mx-auto flex justify-center items-center w-full mt-2">
              <button
                onClick={EditPemeliharaan}
                className="bg-[#7B2CBF] px-3 py-1 w-[140px] rounded-md text-[#E5D5F2] font-abc"
              >
                Simpan
              </button>
              <button
                onClick={() => setOpen(false)}
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
