import React from "react";
import Sidebar from "../../components/layout/Sidebar";
import TopBar from "../../components/layout/TopBar";
import TabelPemeliharaan from "../../components/admin/pemeliharaan/TablePemeliharaan";
import TambahPemeliharaan from "../../components/admin/pemeliharaan/TambahPemeliharaan";

export default function PengeluaranPage() {
  return (
    <div className="w-full flex">
      <div className="w-[16%]">
        <Sidebar setSidebar={3} />
      </div>
      <div className="w-[84%]">
        <TopBar>{"Pemeliharaan "}</TopBar>
        <TabelPemeliharaan />
      </div>
    </div>
  );
}
