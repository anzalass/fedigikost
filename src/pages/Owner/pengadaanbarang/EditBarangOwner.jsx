import React, { useState } from "react";
import SidebarOwner from "../../../components/layoutowner/SidebarOwner";
import TopBarOwner from "../../../components/layoutowner/TopbarOwner";
import { useNavigate } from "react-router-dom";

export default function EditBarangOwner() {
  const [open, setOpen] = useState(false);
  const nav = useNavigate();
  return (
    <div className="w-full h-[160vh] flex">
      <div className={`${!open ? "w-[16%]" : "w-[5%]"} `}>
        <SidebarOwner setSidebar={2} width={open} setWidth={setOpen} />
      </div>
      <div className={`${!open ? "w-[84%]" : "w-[95%]"} `}>
        <TopBarOwner>{"Dashboard Admin"}</TopBarOwner>
        <div className="bg-white w-[98%] mt-3  mb-[200px]  mx-auto p-3 rounded-lg">
          <div className="bg-white w-[100%] mt-3  mb-[200px]  mx-auto p-3 rounded-lg">
            <div className="w-[95%] mx-auto h-[130vh] bg-white rounded-xl">
              <h1 className="font-abc text-xl">Edit Barang</h1>
              <div action="" className="w-[95%] mx-auto mt-2 p-3">
                <div className="w-full mt-4">
                  <h1 className="font-abc pb-2 ">Tanggal Pengadaan</h1>
                  <input
                    type="date"
                    name="tanggalPembelian"
                    // value={data.tanggalPembelian}
                    // onChange={(e) => changePengadaanHandler(e)}
                    className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                  />
                </div>
                <div className="w-full mt-4">
                  <h1 className="font-abc pb-2 ">Kategori</h1>
                  <select
                    name="namaBarang"
                    id=""
                    // value={data.namaBarang}
                    // onChange={(e) => changePengadaanHandler(e)}
                    className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                  >
                    <option value="kulkas">kulkas</option>
                    <option value="Television">Television</option>
                    <option value="Kipas Angin">Kipas Angin</option>
                    <option value="Smartphone">Smartphone</option>
                  </select>
                </div>
                <div className="w-full mt-4">
                  <h1 className="font-abc pb-2">Merek Barang</h1>
                  <input
                    type="text"
                    name="merek"
                    // value={data.merek}
                    // onChange={(e) => changePengadaanHandler(e)}
                    className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                  />
                </div>
                {/* <div className="w-full mt-4">
                                <h1 className="font-abc pb-2">Resi Barang</h1>
                                <input
                                    type="text"
                                    className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                                />
                            </div> */}
                <div className="w-full mt-4">
                  <h1 className="font-abc pb-2">Foto Nota Pembelian</h1>
                  <input
                    type="text"
                    name="buktiNota"
                    // value={data.buktiNota}
                    // onChange={(e) => changePengadaanHandler(e)}
                    className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                  />
                </div>
                {/* <div className="w-full mt-4">
              <h1 className="font-abc pb-2">Alamat</h1>
              <textarea
                name=""
                id=""
                rows="3"
                className="w-full p-3 border-2 border-slate-500"
              ></textarea>
            </div> */}
                <div className="w-full mt-4">
                  <h1 className="font-abc pb-2">Spesifikasi Barang</h1>
                  <input
                    type="text"
                    name="spesifikasi"
                    // value={data.spesifikasi}
                    // onChange={(e) => changePengadaanHandler(e)}
                    className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                  />
                </div>
                <div className="w-full mt-4">
                  <h1 className="font-abc pb-2">Supplier</h1>
                  <input
                    type="text"
                    name="supplier"
                    // value={data.supplier}
                    // onChange={(e) => changePengadaanHandler(e)}
                    className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                  />
                </div>
                <div className="w-full mt-4">
                  <h1 className="font-abc pb-2">Lokasi Barang</h1>
                  <input
                    type="text"
                    name="ruang"
                    // value={data.ruang}
                    // onChange={(e) => changePengadaanHandler(e)}
                    list="cars"
                    className="w-full border-2 border-slate-500"
                  />
                  <datalist id="cars">
                    <option value="101">101</option>
                    <option value="102">102</option>
                    <option value="103">103</option>
                    <option value="104">104</option>
                  </datalist>
                </div>
                <div className="w-full mt-4">
                  <h1 className="font-abc pb-2">Quantitas Barang</h1>
                  <input
                    type="text"
                    name="quantity"
                    // value={data.quantity}
                    // onChange={(e) => changePengadaanHandler(e)}
                    className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                  />
                </div>
                <div className="w-full mt-4">
                  <h1 className="font-abc pb-2">Harga</h1>
                  <input
                    type="text"
                    name="hargaBarang"
                    // value={data.hargaBarang}
                    // onChange={(e) => changePengadaanHandler(e)}
                    className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                  />
                </div>
                <div className="w-full mt-4">
                  <h1 className="font-abc pb-2">Total Harga</h1>
                  <input
                    type="text"
                    // value={data.totalHargaBarang}
                    className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
                    disabled
                  />
                </div>

                {/* <div className="w-full mt-4">
              <label
                htmlFor="ktp"
                className="h-[20px] w-[50px] text-[13px] font-abc rounded-lg p-2 bg-[#E3E8EF]"
              >
                Upload KTP
              </label>
              <input type="file" id="ktp" name="ktp" className="hidden" />
            </div> */}
                <div className="w-full justify-center mt-12 mb-12 flex items-center">
                  <button
                    onClick={() => UpdatePengadaan()}
                    className="bg-[#7B2CBF] px-3 py-1 w-[140px] rounded-md text-[#E5D5F2] font-abc"
                  >
                    Simpan
                  </button>
                  <button
                    onClick={() => nav("/owner/pengadaan-barang")}
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
    </div>
  );
}
