import { useState } from "react";
import TabelDataRuangan from "../../components/admin/dataruangan/TabelDataRuangan";
import Sidebar from "../../components/layout/Sidebar";
import TopBar from "../../components/layout/TopBar";

export default function DataRuanganPage() {
  const [addRuangan, setaddRuangan] = useState(0);
  const [editRuangan, setEditRuangan] = useState(0);

  return (
    <div className="w-full h-[160vh] flex">
      <div className="w-[16%]">
        <Sidebar setSidebar={4} />
      </div>
      <div className="w-[84%]">
        <TopBar>{"Data Ruangan"}</TopBar>
        <div className="w-full mt-2 h-[50px] mx-auto ">
          <div className="w-[95%] h-[80px] justify-between flex mx-auto">
            <div className="">
              <button
                onClick={() => setaddRuangan(1)}
                className="bg-[#7B2CBF] mt-5 px-3 text-center py-1 w-[200px] rounded-md text-[#E5D5F2] font-abc"
              >
                Tambah Ruangan
              </button>
            </div>
            <div className=" mt-5 px-3 py-1 w-[200px] h-[40px] rounded-md  font-abc">
              <input
                type="text"
                className="w-full h-full pl-2 rounded-lg"
                placeholder="Search"
              />
            </div>
          </div>
          {addRuangan === 0 && editRuangan === 0 ? (
            <TabelDataRuangan edit={setEditRuangan} />
          ) : null}
          {addRuangan === 1 ? (
            <div className="w-[95%] mx-auto h-[90vh] bg-white rounded-xl">
              <form action="" className="w-[95%] mx-auto mt-6 p-3">
                <div className="w-full mt-4">
                  <h1 className="font-abc pb-2 ">Kode</h1>
                  <input
                    type="text"
                    className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                  />
                </div>
                <div className="w-full mt-4">
                  <h1 className="font-abc pb-2">Nama Ruangan</h1>
                  <input
                    type="text"
                    className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                  />
                </div>

                <div className="w-full mt-4">
                  <h1 className="font-abc pb-2">Keterangan</h1>
                  <input
                    type="text"
                    className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                  />
                </div>
                <div className="w-full mt-4">
                  <h1 className="font-abc pb-2">Quantity</h1>
                  <input
                    type="text"
                    className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                  />
                </div>
                <div className="w-full justify-center mt-12 flex items-center">
                  <button className="bg-[#7B2CBF] px-3 py-1 w-[140px] rounded-md text-[#E5D5F2] font-abc">
                    Simpan
                  </button>
                  <button
                    onClick={() => setaddRuangan(0)}
                    className="bg-[#E5D5F2] px-3 py-1 w-[140px] rounded-md ml-2  text-[#7B2CBF] font-abc"
                  >
                    Batal
                  </button>
                </div>
              </form>
            </div>
          ) : null}
          {editRuangan === 1 ? (
            <div className="w-[95%] mx-auto h-[90vh] bg-white rounded-xl">
              <form action="" className="w-[95%] mx-auto mt-6 p-3">
                <h1>Edit Ruangan</h1>
                <div className="w-full mt-4">
                  <h1 className="font-abc pb-2 ">Kode</h1>
                  <input
                    type="text"
                    className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                  />
                </div>
                <div className="w-full mt-4">
                  <h1 className="font-abc pb-2">Nama Ruangan</h1>
                  <input
                    type="text"
                    className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                  />
                </div>

                <div className="w-full mt-4">
                  <h1 className="font-abc pb-2">Keterangan</h1>
                  <input
                    type="text"
                    className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                  />
                </div>
                <div className="w-full mt-4">
                  <h1 className="font-abc pb-2">Quantity</h1>
                  <input
                    type="text"
                    className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                  />
                </div>
                <div className="w-full justify-center mt-12 flex items-center">
                  <button className="bg-[#7B2CBF] px-3 py-1 w-[140px] rounded-md text-[#E5D5F2] font-abc">
                    Simpan
                  </button>
                  <button
                    onClick={() => setEditRuangan(0)}
                    className="bg-[#E5D5F2] px-3 py-1 w-[140px] rounded-md ml-2  text-[#7B2CBF] font-abc"
                  >
                    Batal
                  </button>
                </div>
              </form>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
