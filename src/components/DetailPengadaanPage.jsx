import { useState } from "react";
import Car from "../assets/img_car.png";
import { useEffect } from "react";

import { useSelector } from "react-redux";
import Sidebar from "./layout/Sidebar";
import SidebarOwner from "./layoutowner/SidebarOwner";
import TopBarOwner from "./layoutowner/TopbarOwner";

export default function DetailPengadaanPage() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    console.log("loading : ", loading);
  }, [loading]);

  return (
    <div className="w-full h-screen flex">
      <div className={` `}>
        {user?.role === 1 ? (
          <SidebarOwner setSidebar={2} width={open} setWidth={setOpen} />
        ) : (
          <Sidebar setSidebar={2} width={open} setWidth={setOpen} />
        )}
      </div>
      <div className={`w-11/12 mx-auto`}>
        <TopBarOwner>{"Detail Pengadaan - ASW1123"}</TopBarOwner>
        <div className="w-[95%] mx-auto mt-2 h-[50px] flex">
          <div className="block w-full font-abc">
            <div className="flex w-full ">
              <div className="w-[40%] md:w-[25%] lg:w-[20%] xl:w-[20%]">
                {" "}
                <h1 className="my-3">ID Pengadaan</h1>
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
              <div className="w-[40%] md:w-[25%] lg:w-[20%] xl:w-[20%]">
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
              <div className="w-[40%] md:w-[25%] lg:w-[20%] xl:w-[20%]">
                {" "}
                <h1 className="my-3">Tanggal Pengadaan</h1>
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
              <div className="w-[40%] md:w-[25%] lg:w-[20%] xl:w-[20%]">
                {" "}
                <h1 className="my-3">Harga</h1>
              </div>
              <div className="w-[5%]">
                {" "}
                <h1 className="my-3">:</h1>
              </div>
              <div className="w-[65%]">
                {" "}
                <h1 className="my-3">Rp. 23000</h1>
              </div>
            </div>
            <div className="flex w-full ">
              <div className="w-[40%] md:w-[25%] lg:w-[20%] xl:w-[20%]">
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
              <div className="w-[40%] md:w-[25%] lg:w-[20%] xl:w-[20%]">
                {" "}
                <h1 className="my-3">Foto</h1>
              </div>
              <div className="w-[5%]">
                {" "}
                <h1 className="my-3">:</h1>
              </div>
              <div className="w-[65%]">
                {" "}
                <img src={Car} alt="" />
              </div>
            </div>
            <div className="flex w-full ">
              <div className="w-[40%] md:w-[25%] lg:w-[20%] xl:w-[20%]">
                {" "}
                <h1 className="my-3">Qty Barang</h1>
              </div>
              <div className="w-[5%]">
                {" "}
                <h1 className="my-3">:</h1>
              </div>
              <div className="w-[65%]">
                {" "}
                <h1 className="my-3">2</h1>
              </div>
            </div>
            <div className="flex w-full ">
              <div className="w-[40%] md:w-[25%] lg:w-[20%] xl:w-[20%]">
                {" "}
                <h1 className="my-3">Status</h1>
              </div>
              <div className="w-[5%]">
                {" "}
                <h1 className="my-3">:</h1>
              </div>
              <div className="w-[65%]">
                {" "}
                <h1 className="my-3">Pending / Menunggu Persetujuan</h1>
              </div>
            </div>
            <div className="flex w-full ">
              <div className="w-[40%] md:w-[25%] lg:w-[20%] xl:w-[20%]">
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
