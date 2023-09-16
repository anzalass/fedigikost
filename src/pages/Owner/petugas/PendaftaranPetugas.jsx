import React, { useState } from "react";
import SidebarOwner from "../../../components/layoutowner/SidebarOwner";
import TopBarOwner from "../../../components/layoutowner/TopbarOwner";
import { useNavigate } from "react-router-dom";

export default function PendaftaranPetugas() {
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full h-[160vh] flex">
      <div className={`${!open ? "w-[16%]" : "w-[5%]"} `}>
        <SidebarOwner setSidebar={5} width={open} setWidth={setOpen} />
      </div>
      <div className={`${!open ? "w-[84%]" : "w-[95%]"} `}>
        <TopBarOwner>{"Pendaftaran Petugas"}</TopBarOwner>
        <div className="w-full">
          <div className="w-[95%] h-[80px] justify-between flex mx-auto">
            <form className="w-[80%] mx-auto mt-10">
              <div className="w-full mt-4">
                <h1 className="font-abc pb-2">Nama Lengkap</h1>
                <input
                  type="text"
                  name="merek"
                  // onChange={(e) => changePengadaanHandler(e)}
                  className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                />
              </div>
              <div className="w-full mt-4">
                <h1 className="font-abc pb-2">Email</h1>
                <input
                  type="text"
                  name="merek"
                  // onChange={(e) => changePengadaanHandler(e)}
                  className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                />
              </div>
              <div className="w-full mt-4">
                <h1 className="font-abc pb-2">No HP</h1>
                <input
                  type="number"
                  name="merek"
                  // onChange={(e) => changePengadaanHandler(e)}
                  className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                />
              </div>
              <div className="w-full justify-center mt-12 mb-12 flex items-center">
                <button
                  // onClick={(e) => TambahPengadaan(e)}
                  className="bg-[#7B2CBF] px-3 py-1 w-[140px] rounded-md text-[#E5D5F2] font-abc"
                >
                  Simpan
                </button>
                <button
                  onClick={() => nav("/owner/petugas")}
                  className="bg-[#E5D5F2] px-3 py-1 w-[140px] rounded-md ml-2  text-[#7B2CBF] font-abc"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
