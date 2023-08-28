import React, { useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import TopBar from "../../components/layout/TopBar";
import Indikator from "../../components/admin/home/Indikator";
import Tagihan from "../../components/admin/pengadaanbarang/TabelBarang";
import Aktivitas from "../../components/admin/home/Aktivitas";
import AdminDetailCard from "../../components/admin/home/AdminDetailCard";

export default function HomePage() {
  const [open, setOpen] = useState(1);

  return (
    <div className="w-full h-[160vh] flex">
      <div className="w-[16%]">
        {/* <button onClick={(e) => setOpen(1)}>buka</button> */}
        {open === 1 ? <Sidebar setSidebar={1} open={setOpen} /> : null}
      </div>
      <div className="w-[84%]">
        <TopBar>{"Dashboard Admin"}</TopBar>
        <div className="w-full mt-2 h-[50px] mx-auto ">
          <h1 className="text-[20px] font-abc ml-6">
            Selamat datang <span className="font-[500]">, Admin</span>
          </h1>
          <div className="mt-4 w-[95%] opacity-25 mx-auto  h-[1px] bg-slate-600"></div>
        </div>
        <Indikator />
        <div className="flex w-[97%] justify-center mx-auto  h-[60vh] ">
          <div className="w-[55%] ">
            <Aktivitas />
          </div>
          <div className=" w-[44%] ">
            <AdminDetailCard />
          </div>
        </div>
      </div>
    </div>
  );
}
