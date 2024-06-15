import { useState } from "react";

import { useEffect } from "react";

import { useSelector } from "react-redux";
import Sidebar from "./layout/Sidebar";
import TopBar from "./layout/TopBar";

export default function DetailPemeliharaanPage() {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    console.log("loading : ", loading);
  }, [loading]);

  return (
    <div className="w-full h-screen flex">
      <div className={` `}>
        <Sidebar setSidebar={3} width={open} setWidth={setOpen} />
      </div>
      <div className={`w-11/12 mx-auto`}>
        <TopBar>{"Detail Pemeliharaan - ASW1123"}</TopBar>

        <div className="w-[95%] mx-auto mt-2 h-[50px] flex">
          <div className="block w-full font-abc">
            <div className="flex w-full ">
              <div className="w-[20%]">
                {" "}
                <h1 className="my-3">ID Pemeliharaan</h1>
              </div>
              <div className="w-[5%]">
                {" "}
                <h1 className="my-3">:</h1>
              </div>
              <div className="w-[65%]">
                {" "}
                <h1 className="my-3">AASSW1123</h1>
              </div>
            </div>
            <div className="flex w-full ">
              <div className="w-[20%]">
                {" "}
                <h1 className="my-3">Nama Barang</h1>
              </div>
              <div className="w-[5%]">
                {" "}
                <h1 className="my-3">:</h1>
              </div>
              <div className="w-[65%]">
                {" "}
                <h1 className="my-3">Kulkas Miyako</h1>
              </div>
            </div>
            <div className="flex w-full ">
              <div className="w-[20%]">
                {" "}
                <h1 className="my-3">Tanggal Pemeliharaan</h1>
              </div>
              <div className="w-[5%]">
                {" "}
                <h1 className="my-3">:</h1>
              </div>
              <div className="w-[65%]">
                {" "}
                <h1 className="my-3">27 Agustus 2023</h1>
              </div>
            </div>
            <div className="flex w-full ">
              <div className="w-[20%]">
                {" "}
                <h1 className="my-3">Jumlah</h1>
              </div>
              <div className="w-[5%]">
                {" "}
                <h1 className="my-3">:</h1>
              </div>
              <div className="w-[65%]">
                {" "}
                <h1 className="my-3">2 Buah</h1>
              </div>
            </div>
            <div className="flex w-full ">
              <div className="w-[20%]">
                {" "}
                <h1 className="my-3">Keterangan</h1>
              </div>
              <div className="w-[5%]">
                {" "}
                <h1 className="my-3">:</h1>
              </div>
              <div className="w-[65%]">
                {" "}
                <h1 className="my-3">Rusak Kesiram Kopi</h1>
              </div>
            </div>
            <div className="flex w-full ">
              <div className="w-[20%]">
                {" "}
                <h1 className="my-3">Lokasi Barang</h1>
              </div>
              <div className="w-[5%]">
                {" "}
                <h1 className="my-3">:</h1>
              </div>
              <div className="w-[65%]">
                {" "}
                <h1 className="my-3">R001</h1>
              </div>
            </div>
            <div className="flex w-full ">
              <div className="w-[20%]">
                {" "}
                <h1 className="my-3">Status</h1>
              </div>
              <div className="w-[5%]">
                {" "}
                <h1 className="my-3">:</h1>
              </div>
              <div className="w-[65%]">
                {" "}
                <h1 className="my-3">Menunngu Persetujuan / Pending</h1>
              </div>
            </div>
            <div className="flex w-full ">
              <div className="w-[20%]">
                {" "}
                <h1 className="my-3">Biaya</h1>
              </div>
              <div className="w-[5%]">
                {" "}
                <h1 className="my-3">:</h1>
              </div>
              <div className="w-[65%]">
                {" "}
                <h1 className="my-3">Rp.230000</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
