import React, { useState } from "react";
import SidebarOwner from "../../../components/layoutowner/SidebarOwner";
import TopBarOwner from "../../../components/layoutowner/TopbarOwner";
import { useNavigate } from "react-router-dom";

export default function TambahRuanganOwner() {
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full h-[160vh] flex">
      <div className={`${!open ? "w-[16%]" : "w-[5%]"} `}>
        <SidebarOwner setSidebar={4} width={open} setWidth={setOpen} />
      </div>
      <div className={`${!open ? "w-[84%]" : "w-[95%]"} `}>
        <TopBarOwner>{"Tambah Data Ruangan"}</TopBarOwner>
        <div className="w-full">
          <div className="w-[95%] mx-auto h-[90vh] bg-white rounded-xl">
            <div action="" className="w-[95%] mx-auto mt-6 p-3">
              <div className="w-full mt-4">
                <h1 className="font-abc pb-2 ">Kode</h1>
                <input
                  type="text"
                  name="kodeRuang"
                  //   onChange={(e) => changeRuangHandler(e)}
                  className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                />
                {/* {errRuangan.kodeRuang ? <p>{errRuangan.kodeRuang}</p> : null} */}
              </div>
              <div className="w-full mt-4">
                <h1 className="font-abc pb-2">Nama Ruangan</h1>
                <input
                  type="text"
                  name="ruang"
                  //   onChange={(e) => changeRuangHandler(e)}
                  className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                />
                {/* {errRuangan.ruang ? <p>{errRuangan.ruang}</p> : null} */}
              </div>
              <div className="w-full justify-center mt-12 flex items-center">
                <button
                  onClick={() => tambahRuang()}
                  className="bg-[#7B2CBF] px-3 py-1 w-[140px] rounded-md text-[#E5D5F2] font-abc"
                >
                  Simpan
                </button>
                <button
                  onClick={() => nav("/owner/data-ruangan")}
                  className="bg-[#E5D5F2] px-3 py-1 w-[140px] rounded-md ml-2  text-[#7B2CBF] font-abc"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
