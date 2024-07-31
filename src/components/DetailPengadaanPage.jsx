import { useState } from "react";
import Car from "../assets/img_car.png";
import { useEffect } from "react";

import { useSelector } from "react-redux";
import Sidebar from "./layout/Sidebar";
import TopBar from "./layout/TopBar";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BACKEND_BASE_URL } from "../config/base_url";

export default function DetailPengadaanPage() {
  const [open, setOpen] = useState(false);
  const [pengadaan, setPengadaan] = useState([]);
  // const [loading, setLoading] = useState(true);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const { user } = useSelector((state) => state.user);
  const [data, setData] = useState({
    id: 0,
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
    status: "",
    totalHargaBarang: 0,
  });

  const { id } = useParams();
  const getDataByID = async () => {
    const result = await axios.get(
      `${BACKEND_BASE_URL}/api/findPengadaan/` + id
    );
    setPengadaan(result);
    console.log(result);
    setData((prevData) => ({
      ...prevData,
      id: result.data.results.id,
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
      status: result.data.results.status,
      totalHargaBarang:
        result.data.results.quantity * result.data.results.hargaBarang,
    }));
  };
  useEffect(() => {
    getDataByID();
  }, [id]);

  return (
    <div className="w-full  flex mx-auto">
      <div className={` `}>
        <Sidebar setSidebar={2} width={open} setWidth={setOpen} />
      </div>
      <div className={`w-11/12 mx-auto`}>
        <TopBar>{"Detail Pengadaan - " + id}</TopBar>
        <div className="w-[95%] mx-auto mt-5 h-[50px] flex mb-30">
          <div className="w-[100%] mx-auto">
            <form className="w-full mx-auto">
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium "
                >
                  ID Pengadaan
                </label>
                <input
                  type="email"
                  id="email"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  disabled
                  value={data.id}
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium "
                >
                  Nama Barang
                </label>
                <input
                  type="text"
                  id="password"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  disabled
                  value={data.namaBarang}
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="repeat-password"
                  className="block mb-2 text-sm font-medium "
                >
                  Tanggal Pengadaan
                </label>
                <input
                  type="text"
                  id="repeat-password"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  disabled
                  value={new Date(data.tanggalPembelian).toLocaleDateString(
                    "id-ID",
                    options
                  )}
                />
              </div>
              <div className="w-[50%]">
                <h1 className="font-medium text-sm">Bukti Nota</h1>
                <img
                  src={data.buktiNota}
                  alt=""
                  className="object-contain border-2"
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="repeat-password"
                  className="block mb-2 text-sm font-medium "
                >
                  Harga
                </label>
                <input
                  type="text"
                  id="repeat-password"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  disabled
                  value={"Rp." + data.hargaBarang}
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="repeat-password"
                  className="block mb-2 text-sm font-medium "
                >
                  Quantity Barang
                </label>
                <input
                  type="text"
                  id="repeat-password"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  disabled
                  value={data.quantity}
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="repeat-password"
                  className="block mb-2 text-sm font-medium "
                >
                  Status
                </label>
                <input
                  type="text"
                  id="repeat-password"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  disabled
                  value={data.status}
                />
              </div>
              <div className="mb-10">
                <label
                  htmlFor="repeat-password"
                  className="block mb-2 text-sm font-medium "
                >
                  Biaya
                </label>
                <input
                  type="text"
                  id="repeat-password"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  disabled
                  value={(data.quantity * data.hargaBarang).toLocaleString(
                    "id-ID",
                    {
                      style: "currency",
                      currency: "IDR",
                    }
                  )}
                />
              </div>
              <div className="h-[100px]"></div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
