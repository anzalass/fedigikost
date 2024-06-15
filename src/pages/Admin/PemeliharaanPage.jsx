import React, { useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import TopBar from "../../components/layout/TopBar";
import TabelPemeliharaan from "../../components/admin/pemeliharaan/TablePemeliharaan";

export default function PemeliharaanPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full flex">
      <div className={``}>
        <Sidebar setSidebar={3} width={open} setWidth={setOpen} />
      </div>
      <div className={`w-11/12 mx-auto`}>
        <TopBar>{"Pemeliharaan "}</TopBar>
        <TabelPemeliharaan />
      </div>
    </div>
  );
}
