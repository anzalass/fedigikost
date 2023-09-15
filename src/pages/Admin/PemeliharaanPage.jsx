import React, { useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import TopBar from "../../components/layout/TopBar";
import TabelPemeliharaan from "../../components/admin/pemeliharaan/TablePemeliharaan";
import TambahPemeliharaan from "../../components/admin/pemeliharaan/TambahPemeliharaan";

export default function PengeluaranPage({ userSession }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full flex">
      <div className={`${!open ? "w-[16%]" : "w-[5%]"} `}>
        <Sidebar setSidebar={3} width={open} setWidth={setOpen} />
      </div>
      <div className={`${!open ? "w-[84%]" : "w-[95%]"} `}>
        <TopBar userSession={userSession}>{"Pemeliharaan "}</TopBar>
        <TabelPemeliharaan />
        {/* <TambahPemeliharaan /> */}
      </div>
    </div>
  );
}
