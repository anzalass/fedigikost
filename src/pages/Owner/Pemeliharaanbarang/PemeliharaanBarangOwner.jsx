import React, { useState } from "react";
import SidebarOwner from "../../../components/layoutowner/SidebarOwner";
import TopBarOwner from "../../../components/layoutowner/TopbarOwner";
import TabelPemeliharaanOwner from "./TabelPemeliharaanOwner";
import { useNavigate } from "react-router-dom";

export default function PemeliharaanBarangOwner({ userSession }) {
  const [open, setOpen] = useState(false);
  const nav = useNavigate();

  return (
    <div className="w-full flex">
      <div className={` `}>
        <SidebarOwner setSidebar={3} width={open} setWidth={setOpen} />
      </div>
      <div className={`w-11/12 mx-auto`}>
        <TopBarOwner userSession={userSession}>
          {"Pemeliharaan Owner"}
        </TopBarOwner>

        <TabelPemeliharaanOwner />
      </div>
    </div>
  );
}
