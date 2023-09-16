import React, { useState } from "react";
import SidebarOwner from "../../../components/layoutowner/SidebarOwner";
import TopBarOwner from "../../../components/layoutowner/TopbarOwner";
import { useNavigate } from "react-router-dom";

export default function TambahBarangOwner() {
  const [open, setOpen] = useState(false);
  const [img, setImg] = useState();
  const nav = useNavigate();
  return (
    <div className="w-full h-[160vh] flex">
      <div className={`${!open ? "w-[16%]" : "w-[5%]"} `}>
        <SidebarOwner setSidebar={2} width={open} setWidth={setOpen} />
      </div>
      <div className={`${!open ? "w-[84%]" : "w-[95%]"} `}>
        <TopBarOwner>{"Dashboard Admin"}</TopBarOwner>
        <div className="w-[95%] mx-auto h-[130vh] bg-white rounded-xl">
          <div action="" className="w-[95%] mx-auto mt-2 p-3">
            <h1 className="text-2xl font-abc">Tambah Barang</h1>
            <div className="w-full mt-4">
              <h1 className="font-abc pb-2">Tanggal Pengadaan</h1>
              <input
                type="date"
                name="tanggalPembelian"
                // onChange={(e) => changePengadaanHandler(e)}
                className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
              />
            </div>
            <div className="w-full mt-4">
              <h1 className="font-abc pb-2 ">Kategori</h1>
              <select
                name="namaBarang"
                // onChange={(e) => changePengadaanHandler(e)}
                id=""
                className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
              >
                <option value="kulkas">Pilih Categori</option>
                {/* {kategori.map((item, index) => {
                  return (
                    <option key={index} value={`${item.kodeBarang}`}>
                      {item.namaBarang}:{item.kategori}
                    </option>
                  );
                })} */}
              </select>
            </div>
            <div className="w-full mt-4">
              <h1 className="font-abc pb-2">Merek Barang</h1>
              <input
                type="text"
                name="merek"
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
              <label
                htmlFor="buktiNota"
                className="border-2 border-slate-500 px-2 py-1 text-sm font-abc rounded-md"
              >
                Pilih Foto
              </label>
              <input
                type="file"
                name="buktiNota"
                id="buktiNota"
                onChange={(e) => setImg(e.target.files[0])}
                className="hidden border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
              />
            </div>
            <div className="w-full mt-4">
              {img ? (
                <div className="w-full ">
                  <img
                    className="w-[50%] mx-auto object-contain"
                    src={URL.createObjectURL(img)}
                    alt=""
                  />
                </div>
              ) : null}
            </div>

            <div className="w-full mt-4">
              <h1 className="font-abc pb-2">Spesifikasi Barang</h1>
              <input
                type="text"
                name="spesifikasi"
                // onChange={(e) => changePengadaanHandler(e)}
                className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
              />
            </div>
            <div className="w-full mt-4">
              <h1 className="font-abc pb-2">Supplier</h1>
              <input
                type="text"
                name="supplier"
                // onChange={(e) => changePengadaanHandler(e)}
                className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
              />
            </div>
            <div className="w-full mt-4">
              <h1 className="font-abc pb-2">Lokasi Barang</h1>
              <input
                type="text"
                name="ruang"
                // onChange={(e) => changePengadaanHandler(e)}
                list="cars"
                className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
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
                type="number"
                name="quantity"
                // onChange={(e) => changePengadaanHandler(e)}
                className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
              />
            </div>
            <div className="w-full mt-4">
              <h1 className="font-abc pb-2">Harga</h1>
              <input
                type="number"
                name="hargaBarang"
                // onChange={(e) => changePengadaanHandler(e)}
                className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
              />
            </div>
            <div className="w-full mt-4">
              <h1 className="font-abc pb-2">Total Harga</h1>
              <input
                type="text"
                className=" border-2 border-slate-500 rounded-xl pl-3 w-full h-[30px]"
              />
            </div>

            <div className="w-full justify-center mt-12 mb-12 flex items-center">
              <button
                onClick={(e) => TambahPengadaan(e)}
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
  );
}
